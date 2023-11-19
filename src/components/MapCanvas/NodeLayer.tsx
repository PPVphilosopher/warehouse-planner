import { getNodeColor } from '@/libs/helpers'
import { Node, Size } from '@/libs/types'
import { Layer, Rect } from 'react-konva'

type Props = {
  list: Node[]
  ratio: number
  mapSize: Size
  selectedNode?: Node
  onNodeClick?: (node: Node) => void
}

export const NodeLayer = ({
  list,
  ratio,
  mapSize,
  selectedNode,
  onNodeClick,
}: Props) => {
  return (
    <Layer>
      {list.map((node) => (
        <Rect
          key={node.id}
          x={mapSize.width - node.y / ratio - 2}
          y={mapSize.height - node.x / ratio - 2}
          width={5}
          height={5}
          fill={getNodeColor(node)}
          stroke={selectedNode?.id === node.id ? 'red' : ''}
          onClick={() => onNodeClick?.(node)}
        />
      ))}
    </Layer>
  )
}
