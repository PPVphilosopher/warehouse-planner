import { Tag } from '@/components'
import { getNodeColor } from '@/libs/helpers'
import { Node } from '@/libs/types'
import { List, NodeItem } from './styles'
import { useEffect } from 'react'

type Props = {
  list: Node[]
  selectedNode?: Node
  onNodeClick: (node: Node) => void
}

export const NodeList = ({ list, selectedNode, onNodeClick }: Props) => {
  return (
    <List>
      {list.map((node) => (
        <NodeItem
          key={node.id}
          onClick={() => onNodeClick(node)}
          selected={node.id === selectedNode?.id}
        >
          {node.name ?? node.code}
          {node.charger && (
            <Tag color={getNodeColor(node)}>
              Charger ({node.charger.direction})
            </Tag>
          )}
          {node.chute && (
            <Tag color={getNodeColor(node)}>Chute ({node.chute.direction})</Tag>
          )}
          {node.spawn && <Tag color={getNodeColor(node)}>Spawn</Tag>}
        </NodeItem>
      ))}
    </List>
  )
}
