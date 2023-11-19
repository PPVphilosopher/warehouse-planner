import { Agv, Size } from '@/libs/types'
import { Rect } from 'react-konva'

type Props = {
  agv: Agv
  onAgvClick?: (agv: Agv) => void
  ratio: number
  mapSize: Size
  isSelected?: boolean
}

const AGV_WIDTH = 800
const AGV_HEIGHT = 1000

export const AgvBox = ({
  agv,
  ratio,
  mapSize,
  isSelected,
  onAgvClick,
}: Props) => {
  const isVertical = ['North', 'South'].includes(agv.heading)
  const width = isVertical ? AGV_WIDTH : AGV_HEIGHT
  const height = !isVertical ? AGV_WIDTH : AGV_HEIGHT
  return (
    <>
      <Rect
        x={mapSize.width - (agv.position.y + width / 2) / ratio}
        y={mapSize.height - (agv.position.x + height / 2) / ratio}
        width={width / ratio}
        height={height / ratio}
        fill={isSelected ? 'red' : 'gray'}
        opacity={isSelected ? 0.8 : 0.3}
        onClick={() => onAgvClick?.(agv)}
      />
      <Rect
        x={mapSize.width - agv.position.y / ratio - 1}
        y={mapSize.height - agv.position.x / ratio - 1}
        width={
          isVertical
            ? 3
            : (agv.heading === 'West' ? -1 : 1) * (width / ratio / 2)
        }
        height={
          isVertical
            ? (agv.heading === 'North' ? -1 : 1) * (height / ratio / 2)
            : 3
        }
        fill='black'
        opacity={isSelected ? 0.8 : 0.3}
      />
    </>
  )
}
