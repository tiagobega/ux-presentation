import { useEffect, useRef } from 'react'

export function useRemoteControl(onCommand: (action: string) => void) {
  const ref = useRef(onCommand)
  useEffect(() => { ref.current = onCommand })

  useEffect(() => {
    if (!import.meta.env.DEV) return

    const es = new EventSource('/remote-events')
    es.onmessage = (e) => {
      try {
        const { action } = JSON.parse(e.data) as { action: string }
        if (action) ref.current(action)
      } catch { /* ignore */ }
    }
    return () => es.close()
  }, [])
}
