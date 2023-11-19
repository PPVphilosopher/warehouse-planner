import { Tag } from '@/components'
import { getNodeColor } from '@/libs/helpers'
import { Node } from '@/libs/types'

type Props = {
  node: Node
}

export const NodeTag = ({ node }: Props) => {
  if (node.charger)
    return (
      <Tag color={getNodeColor(node)}>Charger ({node.charger.direction})</Tag>
    )

  if (node.chute)
    return <Tag color={getNodeColor(node)}>Chute ({node.chute.direction})</Tag>

  if (node.spawn) return <Tag color={getNodeColor(node)}>Spawn</Tag>
}
