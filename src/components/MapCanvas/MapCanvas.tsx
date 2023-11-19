'use client'

import { Map, Node, Position, Size } from '@/libs/types'
import { Container } from './styles'
import { Stage, Layer, Rect } from 'react-konva'
import { useEffect, useMemo, useRef, useState } from 'react'
import { NODE_BORDER_BUFFER } from '@/libs/constants'
import { NodeLayer } from './NodeLayer'
import { EdgeLayer } from './EdgeLayer'

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
  }, [map])

  const edge = useMemo(() => {
    const xList = Array.from(new Set(map.nodes.map((n) => n.x)))
    const yList = Array.from(new Set(map.nodes.map((n) => n.y)))

    const result: Record<string, [Position, Position]> = {}

    xList.forEach((x) => {
      const y = map.nodes.filter((n) => n.x === x).map((n) => n.y)
      const min = Math.min(...y)
      const max = Math.max(...y)
      if (min !== max)
        result[`x${x}`] = [
          { x, y: min },
          { x, y: max },
        ]
    })

    yList.forEach((y) => {
      const x = map.nodes.filter((n) => n.y === y).map((n) => n.x)
      const min = Math.min(...x)
      const max = Math.max(...x)
      if (min !== max)
        result[`y${y}`] = [
          { x: min, y },
          { x: max, y },
        ]
    })

    return result
  }, [map])

  const connectedNodePositionList: Position[] = useMemo(() => {
    if (!selectedNode) return []

    const result: Position[] = []
    selectedNode.directions?.forEach((d) => {
      switch (d) {
        case 'North': // +x
          const nLink = map.nodes
            .filter((n) => n.y === selectedNode.y && n.x > selectedNode.x)
            .map((n) => n.x)
          if (nLink)
            result.push({
              x: Math.min(...nLink),
              y: selectedNode.y,
            })
          break

        case 'East': // -y
          const eLink = map.nodes
            .filter((n) => n.x === selectedNode.x && n.y < selectedNode.y)
            .map((n) => n.y)
          if (eLink)
            result.push({
              x: selectedNode.x,
              y: Math.max(...eLink),
            })
          break

        case 'South': // -x
          const sLink = map.nodes
            .filter((n) => n.y === selectedNode.y && n.x < selectedNode.x)
            .map((n) => n.x)
          if (sLink)
            result.push({
              x: Math.max(...sLink),
              y: selectedNode.y,
            })
          break

        case 'West': // +y
          const wLink = map.nodes
            .filter((n) => n.x === selectedNode.x && n.y > selectedNode.y)
            .map((n) => n.y)
          if (wLink)
            result.push({
              x: selectedNode.x,
              y: Math.min(...wLink),
            })
          break
      }
    })

    return result
  }, [map, selectedNode])

  return (
    <Container ref={ref}>
      <Stage {...stageSize} {...stagePosition}>
        <Layer>
          <Rect {...mapSize} fill='white' />
        </Layer>
        <EdgeLayer
          list={edge}
          ratio={ratio}
          mapSize={mapSize}
          selectedNode={selectedNode}
          connectedNodePositionList={connectedNodePositionList}
        />
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
