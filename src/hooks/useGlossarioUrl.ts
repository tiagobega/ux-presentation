import { useEffect, useState } from 'react'

/**
 * URL do glossário da plateia, para virar QR code no slide.
 *
 * Quem responde é o `remoteControlPlugin`: ele descobre o IP da máquina na
 * rede local, porque `localhost` não serve — o QR é lido de outro aparelho.
 * Fora do dev server não existe endpoint, então cai no próprio host.
 */
export function useGlossarioUrl(): string {
  const [url, setUrl] = useState('')

  useEffect(() => {
    let ativo = true
    fetch('/remote-info')
      .then((r) => r.json())
      .then((d: { glossarioUrl?: string }) => {
        if (ativo && d.glossarioUrl) setUrl(d.glossarioUrl)
      })
      .catch(() => {
        if (ativo) setUrl(`${window.location.origin}/glossario`)
      })
    return () => {
      ativo = false
    }
  }, [])

  return url
}
