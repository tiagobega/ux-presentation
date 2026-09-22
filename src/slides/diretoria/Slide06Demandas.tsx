import type { SlideProps } from '../config'
import { Frame, Matriz } from './ui'

/**
 * Slide 6 do plano — Onde absorvemos as demandas. Arquétipo matriz.
 *
 * Tabela de duas colunas, sem cartão por linha e sem texto de fechamento. É
 * uma divisão funcional proposta, não alteração de organograma: por isso
 * identidade e acesso aparecem como integração com Segurança, e não como
 * propriedade da frente de front-end.
 */

const DEMANDAS: [string, string][] = [
  ['Navegação e configuração', 'Plataforma'],
  ['Componentes visuais', 'Base compartilhada'],
  ['Funcionalidade reutilizável', 'Produto'],
  ['Particularidade de cliente', 'Serviço específico'],
  ['Regras e dados', 'Back-end'],
  ['Publicação e operação', 'Infraestrutura'],
  ['Identidade e acesso', 'Segurança · Integração com Gates'],
]

export const ACTIONS = ['O destino de cada demanda']

export default function Slide06Demandas({ action: _ }: SlideProps) {
  void _

  return (
    <Frame title='Distribuição das demandas'>
      <Matriz cabecalho={['Demanda', 'Frente']} linhas={DEMANDAS} />
    </Frame>
  )
}
