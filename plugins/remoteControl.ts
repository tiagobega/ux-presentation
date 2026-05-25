import type { Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'http'
import { networkInterfaces } from 'os'
import { createSocket } from 'dgram'

function getLocalIP(): string {
  try {
    const socket = createSocket('udp4')
    socket.connect(53, '1.1.1.1')
    const { address } = socket.address()
    socket.close()
    if (address && address !== '0.0.0.0') return address
  } catch { /* fall through */ }

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
  slideLabel: string
  action: string
  actionIndex: number
  actions: readonly string[]
  totalSlides: number
}

export function remoteControlPlugin(): Plugin {
  const sseClients = new Set<ServerResponse>()
  const mobileClients = new Set<ServerResponse>()
  let actualPort = 5173
  let presentationState: PresentationState = {
    slide: 0, slideLabel: '', action: '', actionIndex: 0, actions: [], totalSlides: 6,
  }

  return {
    name: 'remote-control',

    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const addr = server.httpServer?.address()
        if (addr && typeof addr === 'object') actualPort = addr.port
      })

      // Desktop subscribes here to receive commands from mobile
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
        res.write(`data: ${JSON.stringify(presentationState)}\n\n`)
        mobileClients.add(res)
        req.on('close', () => mobileClients.delete(res))
      })

      // Mobile POSTs commands here (action name, 'prev', or 'next')
      server.middlewares.use('/remote-command', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const { action } = JSON.parse(body) as { action: string }
            if (action && action !== 'ping') {
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

      // Desktop POSTs presentation state here on every slide/action change
      server.middlewares.use('/remote-update', (req: IncomingMessage, res: ServerResponse) => {
        if (req.method !== 'POST') { res.writeHead(405); res.end(); return }
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            presentationState = { ...presentationState, ...JSON.parse(body) }
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

    .layout { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 28px 20px; gap: 0; }
    .wordmark { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .18em; color: rgba(167,139,250,.3); margin-bottom: 16px; }
    .status { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: .12em; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: rgba(167,139,250,.3); transition: background .4s, box-shadow .4s; flex-shrink: 0; }
    .dot.on { background: #3ad47e; box-shadow: 0 0 8px rgba(58,212,126,.5); }
    .status-text { color: rgba(237,233,246,.38); }

    .slide-label { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: .18em; color: rgba(167,139,250,.7); margin-bottom: 16px; min-height: 14px; }

    .action-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 8px; width: 100%; max-width: 380px; margin-bottom: 20px; }
    .action-btn { padding: 16px 8px; border-radius: 10px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.03); color: rgba(237,233,246,.55); font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .14em; text-transform: uppercase; cursor: pointer; transition: all .15s; user-select: none; -webkit-user-select: none; line-height: 1.3; text-align: center; }
    .action-btn.sel { background: rgba(167,139,250,.14); border-color: rgba(167,139,250,.45); color: #c4b5fd; box-shadow: 0 0 10px rgba(167,139,250,.1); }
    .action-btn:active { transform: scale(.92); }

    .slide-nav { display: flex; align-items: center; gap: 10px; width: 100%; max-width: 380px; }
    .nav-btn { flex: 1; height: 44px; border-radius: 10px; border: 1px solid rgba(255,255,255,.07); background: rgba(255,255,255,.02); color: rgba(237,233,246,.38); font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: .12em; cursor: pointer; transition: all .15s; user-select: none; -webkit-user-select: none; }
    .nav-btn:active { background: rgba(255,255,255,.06); color: rgba(237,233,246,.7); transform: scale(.96); }
    .slide-pos { font-family: 'Space Mono', monospace; font-size: 10px; color: rgba(237,233,246,.2); letter-spacing: .08em; white-space: nowrap; }

    .feedback { margin-top: 16px; font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(167,139,250,.45); letter-spacing: .1em; min-height: 14px; opacity: 0; transition: opacity .3s; }
  </style>
</head>
<body>
  <div class="layout">
    <div class="wordmark">INTELICITY &middot; REMOTE</div>
    <div class="status">
      <div class="dot" id="dot"></div>
      <span class="status-text" id="st">CONECTANDO...</span>
    </div>
    <div class="slide-label" id="slide-label">&mdash;</div>
    <div class="action-grid" id="action-grid"></div>
    <div class="slide-nav">
      <button class="nav-btn" id="bp">&larr; SLIDE</button>
      <span class="slide-pos" id="spos">1/6</span>
      <button class="nav-btn" id="bn">SLIDE &rarr;</button>
    </div>
    <div class="feedback" id="fb"></div>
  </div>
  <script>
    const dot = document.getElementById('dot');
    const st  = document.getElementById('st');
    const fb  = document.getElementById('fb');
    const slideLabel = document.getElementById('slide-label');
    const actionGrid = document.getElementById('action-grid');
    const spos = document.getElementById('spos');
    let fbTimer;
    let currentAction = '';

    function showFeedback(msg) {
      clearTimeout(fbTimer);
      fb.textContent = msg;
      fb.style.opacity = '1';
      fbTimer = setTimeout(() => { fb.style.opacity = '0'; }, 800);
    }

    async function send(action) {
      try {
        await fetch('${commandUrl}', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action })
        });
      } catch { showFeedback('sem conex\\u00e3o'); }
    }

    function renderActions(state) {
      currentAction = state.action;
      slideLabel.textContent = (state.slideLabel || '\\u2014').toUpperCase();
      spos.textContent = (state.slide + 1) + '/' + state.totalSlides;

      const actions = state.actions || [];
      actionGrid.innerHTML = '';
      actions.forEach(name => {
        const btn = document.createElement('button');
        btn.className = 'action-btn' + (name === currentAction ? ' sel' : '');
        btn.textContent = name.toUpperCase();
        const go = () => { send(name); showFeedback(name.toUpperCase()); };
        btn.addEventListener('touchstart', e => { e.preventDefault(); go(); }, { passive: false });
        btn.addEventListener('click', go);
        actionGrid.appendChild(btn);
      });
    }

    // Subscribe to presentation state
    const mobileEs = new EventSource('${eventsUrl}');
    mobileEs.onmessage = e => {
      try {
        const state = JSON.parse(e.data);
        if ('actions' in state) renderActions(state);
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

    // Slide navigation buttons (go directly to prev/next slide)
    function addNavBtn(id, action, label) {
      const el = document.getElementById(id);
      const go = () => { send(action); showFeedback(label); };
      el.addEventListener('touchstart', e => { e.preventDefault(); go(); }, { passive: false });
      el.addEventListener('click', go);
    }
    addNavBtn('bp', 'prev', '\\u2190 SLIDE');
    addNavBtn('bn', 'next', 'SLIDE \\u2192');
    ping();
  </script>
</body>
</html>`
}
