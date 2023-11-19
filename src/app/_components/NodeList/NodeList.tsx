import { NodeTag, Tag } from '@/components'
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
          <NodeTag node={node} />
        </NodeItem>
      ))}
    </List>
  )
}
