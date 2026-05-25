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
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div className="qr-overlay" onClick={onClose}>
      <div className="qr-panel" onClick={(e) => e.stopPropagation()}>
        <div className="qr-tag">Controle remoto</div>
        <div className="qr-title">Escaneie e controle pelo celular</div>
        <div className="qr-code-wrap">
          {url ? (
            <QRCode value={url} size={180} bgColor="transparent" fgColor="#ede9f6" />
          ) : (
            <div className="qr-loading">…</div>
          )}
        </div>
        <div className="qr-url">{url}</div>
        <div className="qr-hint">← → navegar · ESC fechar</div>
      </div>
    </div>
  )
}
