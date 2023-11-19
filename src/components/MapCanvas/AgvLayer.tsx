import { Agv, Size } from '@/libs/types'
import { Layer, Rect } from 'react-konva'
import { AgvBox } from './AgvBox'

type Props = {
  agvList: Record<string, Agv>
  selectedAgv?: string
  onAgvClick?: (agv: Agv) => void
  ratio: number
  mapSize: Size
}

export const AgvLayer = ({
  agvList,
  selectedAgv,
  onAgvClick,
  ratio,
  mapSize,
}: Props) => {
  return (
    <Layer>
      {Object.values(agvList).map((agv) => {
        if (agv.serial === selectedAgv) return null

        return (
          <AgvBox
            key={agv.serial}
            agv={agv}
            ratio={ratio}
            mapSize={mapSize}
            onAgvClick={onAgvClick}
          />
        )
      })}
      {selectedAgv && (
        <AgvBox
          agv={agvList[selectedAgv]}
          ratio={ratio}
          mapSize={mapSize}
          isSelected
          onAgvClick={onAgvClick}
        />
      )}
    </Layer>
  )
}
