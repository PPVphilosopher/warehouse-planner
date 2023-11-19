import { Node, Position, Size } from '@/libs/types'
import { Layer, Line } from 'react-konva'

type Props = {
  list: Record<string, [Position, Position]>
  ratio: number
  mapSize: Size
  selectedNode?: Node
  connectedNodePositionList?: Position[]
}

export const EdgeLayer = ({
  list,
  ratio,
  mapSize,
  selectedNode,
  connectedNodePositionList,
}: Props) => {
  return (
    <Layer>
      {Object.entries(list).map(([key, [from, to]]) => (
        <Line
          key={key}
          points={[
            mapSize.width - from.y / ratio,
            mapSize.height - from.x / ratio,
            mapSize.width - to.y / ratio,
            mapSize.height - to.x / ratio,
          ]}
          stroke='lightblue'
        />
      ))}
      {selectedNode &&
        connectedNodePositionList?.map(({ x, y }) => (
          <Line
            key={`${x},${y}`}
            points={[
              mapSize.width - selectedNode.y / ratio,
              mapSize.height - selectedNode.x / ratio,
              mapSize.width - y / ratio,
              mapSize.height - x / ratio,
            ]}
            stroke='red'
          />
        ))}
    </Layer>
  )
}
