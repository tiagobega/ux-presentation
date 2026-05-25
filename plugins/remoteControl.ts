import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { networkInterfaces } from 'os'
import { createSocket } from 'dgram'

function getLocalIP(): string {
  // Ask the OS which local IP it would use to reach the internet.
  // This finds the correct LAN interface even when VPNs or virtual
  // adapters are present — no data is actually sent.
  try {
    const socket = createSocket('udp4')
    socket.connect(53, '1.1.1.1')
    const { address } = socket.address()
    socket.close()
    if (address && address !== '0.0.0.0') return address
  } catch { /* fall through */ }

  // Fallback: prefer 192.168.x.x, then other RFC-1918, then anything
  const nets = networkInterfaces()
  let rfc1918 = ''
  for (const iface of Object.values(nets)) {
    for (const net of iface ?? []) {
      if (net.family !== 'IPv4' || net.internal) continue
      if (net.address.startsWith('192.168.')) return net.address
      if (!rfc1918 && (net.address.startsWith('10.') || /^172\.(1[6-9]|2\d|3[01])\./.test(net.address))) {
        rfc1918 = net.address
      }
    }
  }
  return rfc1918 || 'localhost'
}

interface PresentationState {
  slide: number
  step: number
  slideLabel: string
  stepLabel: string
  totalSteps: number
  totalSlides: number
}

export function remoteControlPlugin(): Plugin {
  const sseClients = new Set<ServerResponse>()
  const mobileClients = new Set<ServerResponse>()
  let actualPort = 5173
  let presentationState: PresentationState = {
    slide: 0, step: 0, slideLabel: '', stepLabel: '', totalSteps: 1, totalSlides: 6,
  }

  return {
    name: 'remote-control',

    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const addr = server.httpServer?.address()
        if (addr && typeof addr === 'object') actualPort = addr.port
      })

      // Desktop subscribes here to receive prev/next commands
      server.middlewares.use('/remote-events', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        res.write('data: {"type":"connected"}\n\n')
        sseClients.add(res)
        req.on('close', () => sseClients.delete(res))
      })

      // Mobile subscribes here to receive presentation state updates
      server.middlewares.use('/mobile-events', (req: IncomingMessage, res: ServerResponse) => {
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Connection', 'keep-alive')
        // Send current state immediately on connect
        res.write(`data: ${JSON.stringify(presentationState)}\n\n`)
        mobileClients.add(res)
        req.on('close', () => mobileClients.delete(res))
      })

      // Mobile POSTs prev/next commands here
      server.middlewares.use('/remote-command', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') {
          res.writeHead(405)
          res.end()
          return
        }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const { action } = JSON.parse(body) as { action: string }
            if (action === 'prev' || action === 'next') {
              const msg = `data: ${JSON.stringify({ action })}\n\n`
              sseClients.forEach((client) => {
                try { client.write(msg) } catch { sseClients.delete(client) }
              })
            }
          } catch { /* ignore malformed JSON */ }
          res.writeHead(200)
          res.end('ok')
        })
      })

      // Desktop POSTs presentation state here (slide/step changes)
      server.middlewares.use('/remote-update', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') {
          res.writeHead(405)
          res.end()
          return
        }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const update = JSON.parse(body) as Partial<PresentationState>
            presentationState = { ...presentationState, ...update }
            const msg = `data: ${JSON.stringify(presentationState)}\n\n`
            mobileClients.forEach((client) => {
              try { client.write(msg) } catch { mobileClients.delete(client) }
            })
          } catch { /* ignore malformed JSON */ }
          res.writeHead(200)
          res.end('ok')
        })
      })

      // React app fetches this to build the QR code URL
      server.middlewares.use('/remote-info', (_req: IncomingMessage, res: ServerResponse) => {
        const ip = getLocalIP()
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ remoteUrl: `http://${ip}:${actualPort}/remote` }))
      })

      // Self-contained mobile controller page
      server.middlewares.use('/remote', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url !== '/' && req.url !== '') { next(); return }
        const host = req.headers.host ?? `localhost:${actualPort}`
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(buildMobileHTML(host))
      })
    },
  }
}

function buildMobileHTML(host: string): string {
  const commandUrl = `http://${host}/remote-command`
  const eventsUrl = `http://${host}/mobile-events`
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  <title>Intelicity · Remote</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=DM+Sans:opsz,wght@9..40,300;9..40,600&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body { height: 100%; overflow: hidden; touch-action: none; background: #13111a; color: #ede9f6; font-family: 'DM Sans', sans-serif; }
    body { background-image: linear-gradient(rgba(167,139,250,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,.025) 1px, transparent 1px); background-size: 48px 48px; }
    .layout { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 32px 24px; }
    .wordmark { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .18em; color: rgba(167,139,250,.35); margin-bottom: 20px; }
    .status { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .12em; display: flex; align-items: center; gap: 8px; margin-bottom: 24px; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(167,139,250,.3); transition: background .4s, box-shadow .4s; }
    .dot.on { background: #3ad47e; box-shadow: 0 0 8px rgba(58,212,126,.5); }
    .status-text { color: rgba(237,233,246,.38); }
    .slide-context { text-align: center; margin-bottom: 28px; min-height: 36px; }
    .ctx-slide { font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: .16em; color: rgba(167,139,250,.8); margin-bottom: 5px; transition: opacity .3s; }
    .ctx-step { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .14em; color: rgba(237,233,246,.35); }
    .controls { display: flex; gap: 16px; width: 100%; max-width: 380px; }
    .btn { flex: 1; height: clamp(100px, 25vw, 148px); border-radius: 16px; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #ede9f6; font-family: 'Space Mono', monospace; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; transition: background .1s, border-color .1s, transform .1s; user-select: none; -webkit-user-select: none; }
    .btn:active { transform: scale(.93); background: rgba(167,139,250,.12); border-color: rgba(167,139,250,.4); }
    .arrow { font-size: 32px; line-height: 1; }
    .label { opacity: .45; font-size: 9px; letter-spacing: .18em; }
    .feedback { margin-top: 36px; font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(167,139,250,.5); letter-spacing: .1em; min-height: 18px; opacity: 0; transition: opacity .3s; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="wordmark">INTELICITY &middot; REMOTE</div>
    <div class="status">
      <div class="dot" id="dot"></div>
      <span class="status-text" id="st">CONECTANDO...</span>
    </div>
    <div class="slide-context">
      <div class="ctx-slide" id="ctx-slide">&mdash;</div>
      <div class="ctx-step" id="ctx-step">&mdash;</div>
    </div>
    <div class="controls">
      <button class="btn" id="bp"><span class="arrow">&larr;</span><span class="label">ANTERIOR</span></button>
      <button class="btn" id="bn"><span class="arrow">&rarr;</span><span class="label">PR&Oacute;XIMO</span></button>
    </div>
    <div class="feedback" id="fb"></div>
  </div>
  <script>
    const dot = document.getElementById('dot');
    const st  = document.getElementById('st');
    const fb  = document.getElementById('fb');
    const ctxSlide = document.getElementById('ctx-slide');
    const ctxStep  = document.getElementById('ctx-step');
    let fbTimer;

    function showFeedback(msg) {
      clearTimeout(fbTimer);
      fb.textContent = msg;
      fb.style.opacity = '1';
      fbTimer = setTimeout(() => { fb.style.opacity = '0'; }, 900);
    }

    async function send(action) {
      showFeedback(action === 'next' ? 'PR\\u00d3XIMO \\u2192' : '\\u2190 ANTERIOR');
      try {
        await fetch('${commandUrl}', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
      } catch { showFeedback('sem conex\\u00e3o'); }
    }

    // Subscribe to presentation state updates
    const mobileEs = new EventSource('${eventsUrl}');
    mobileEs.onmessage = (e) => {
      try {
        const state = JSON.parse(e.data);
        if (state.slideLabel !== undefined) {
          ctxSlide.textContent = state.slideLabel.toUpperCase();
          ctxStep.textContent = state.stepLabel.toUpperCase() + ' \\u00b7 ' + (state.step + 1) + '/' + state.totalSteps;
        }
      } catch {}
    };

    async function ping() {
      try {
        await fetch('${commandUrl}', { method: 'POST', headers: {'Content-Type':'application/json'}, body: '{"action":"ping"}' });
        dot.classList.add('on');
        st.textContent = 'CONECTADO';
      } catch {
        dot.classList.remove('on');
        st.textContent = 'SEM CONEX\\u00c3O';
      }
      setTimeout(ping, 5000);
    }

    function addBtn(id, action) {
      const el = document.getElementById(id);
      el.addEventListener('touchstart', (e) => { e.preventDefault(); send(action); }, { passive: false });
      el.addEventListener('click', () => send(action));
    }
    addBtn('bp', 'prev');
    addBtn('bn', 'next');
    ping();
  </script>
</body>
</html>`
}
