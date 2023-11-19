'use client'

import { Map, Node, Position, Size } from '@/libs/types'
import { Container } from './styles'
import { Stage, Layer, Rect } from 'react-konva'
import { useEffect, useRef, useState } from 'react'
import { NODE_BORDER_BUFFER } from '@/libs/constants'
import { NodeLayer } from './NodeLayer'

type Props = {
  map: Map
  selectedNode?: Node
  onNodeClick?: (node: Node) => void
}

// north +x
// west +y

const MapCanvas = ({ map, selectedNode, onNodeClick }: Props) => {
  const [ratio, setRatio] = useState(1)
  const [stageSize, setStageSize] = useState<Size>({ width: 1, height: 1 })
  const [stagePosition, setStagePosition] = useState<Position>({ x: 0, y: 0 })
  const [mapSize, setMapSize] = useState<Size>({ width: 1, height: 1 })

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !map) return

    const { clientWidth, clientHeight } = ref.current

    setStageSize({
      width: clientWidth,
      height: clientHeight,
    })

    const nodeX = Math.max(...map.nodes.map((n) => n.x)) ?? 0
    const nodeY = Math.max(...map.nodes.map((n) => n.y)) ?? 0

    const heightRatio = (nodeX + NODE_BORDER_BUFFER) / clientHeight
    const widthRatio = (nodeY + NODE_BORDER_BUFFER) / clientWidth

    const ratio = Math.max(widthRatio, heightRatio)
    setRatio(ratio)

    const mapSize: Size = {
      width: (nodeY + NODE_BORDER_BUFFER) / ratio,
      height: (nodeX + NODE_BORDER_BUFFER) / ratio,
    }
    setMapSize(mapSize)

    const stagePosition: Position = {
      x: (clientWidth - mapSize.width) / 2,
      y: (clientHeight - mapSize.height) / 2,
    }
    setStagePosition(stagePosition)
  }, [])

  return (
    <Container ref={ref}>
      <Stage {...stageSize} {...stagePosition}>
        <Layer>
          <Rect {...mapSize} fill='white' />
        </Layer>
        <NodeLayer
          list={map.nodes}
          ratio={ratio}
          mapSize={mapSize}
          selectedNode={selectedNode}
          onNodeClick={onNodeClick}
        />
      </Stage>
    </Container>
  )
}

export default MapCanvas
