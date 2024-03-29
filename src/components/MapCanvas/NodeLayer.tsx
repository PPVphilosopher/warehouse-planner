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

const NODE_DISPLAY_SIZE = 7

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
          x={mapSize.width - node.y / ratio - Math.floor(NODE_DISPLAY_SIZE / 2)}
          y={
            mapSize.height - node.x / ratio - Math.floor(NODE_DISPLAY_SIZE / 2)
          }
          width={NODE_DISPLAY_SIZE}
          height={NODE_DISPLAY_SIZE}
          fill={getNodeColor(node)}
          stroke={selectedNode?.id === node.id ? 'red' : ''}
          onClick={() => onNodeClick?.(node)}
        />
      ))}
    </Layer>
  )
}
