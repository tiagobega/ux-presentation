import { useEffect } from 'react'
import Presentation from './components/Presentation'
import { DECK } from './slides/decks'

export default function App() {
  // O título da aba acompanha o deck ativo.
  useEffect(() => {
    document.title = DECK.title
  }, [])

  return <Presentation />
}
