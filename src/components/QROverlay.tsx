import { useEffect, useState } from 'react'
import QRCode from 'react-qr-code'

interface Props {
  onClose: () => void
}

export default function QROverlay({ onClose }: Props) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    fetch('/remote-info')
      .then((r) => r.json())
      .then((d: { remoteUrl: string }) => setUrl(d.remoteUrl))
      .catch(() => setUrl('http://localhost:5173/remote'))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] bg-[rgba(248,245,255,0.88)] backdrop-blur-[10px] flex items-center justify-center anim-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white/95 border border-purple/[0.22] p-10 px-9 text-center max-w-[340px] w-[90%] shadow-[0_8px_40px_rgba(109,40,217,0.08)] anim-panel-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-mono text-[10px] tracking-[0.2em] text-purple/[0.45] uppercase mb-[10px]">
          Controle remoto
        </div>
        <div className="text-[18px] font-bold text-text tracking-[-0.02em] mb-7">
          Escaneie e controle pelo celular
        </div>
        <div className="inline-flex p-[18px] bg-text/[0.03] border border-text/[0.08] mb-5">
          {url ? (
            <QRCode value={url} size={180} bgColor="transparent" fgColor="#1a1225" />
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center font-mono text-[20px] text-text/[0.32]">
              …
            </div>
          )}
        </div>
        <div className="font-mono text-[10px] text-purple/55 tracking-[0.04em] mb-[14px] break-all leading-[1.5]">
          {url}
        </div>
        <div className="text-[12px] font-light text-text/55">← → navegar · ESC fechar</div>
      </div>
    </div>
  )
}
