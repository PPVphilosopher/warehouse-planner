import { Node } from './types'

export const getNodeColor = (node: Node) => {
  if (node.spawn) return 'green'
  if (node.charger) return 'orange'
  if (node.chute) return 'gray'
  return 'blue'
}
