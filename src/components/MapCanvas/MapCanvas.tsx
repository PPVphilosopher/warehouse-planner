'use client'

import { NODE_BORDER_BUFFER } from '@/libs/constants'
import {
  Agv,
  Direction,
  KeyboardDirection,
  Map,
  Node,
  Position,
  Size,
} from '@/libs/types'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Layer, Rect, Stage } from 'react-konva'
import { AgvLayer } from './AgvLayer'
import { EdgeLayer } from './EdgeLayer'
import { NodeLayer } from './NodeLayer'
import { Container } from './styles'

type Props = {
  map: Map
  selectedNode?: Node
  onNodeClick?: (node: Node) => void
  agvList: Record<string, Agv>
  setAgvList: Dispatch<SetStateAction<Record<string, Agv>>>
  selectedAgv?: string
  onAgvClick?: (agv: Agv) => void
  keyPress?: KeyboardDirection
}

// north +x
// west +y

const MapCanvas = ({
  map,
  selectedNode,
  onNodeClick,
  agvList,
  setAgvList,
  selectedAgv,
  onAgvClick,
  keyPress,
}: Props) => {
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

  const getConnectedNodePositionList = (
    node: Node
  ): (Position & { direction: Direction })[] => {
    const result: (Position & { direction: Direction })[] = []
    node.directions?.forEach((d) => {
      switch (d) {
        case 'North': // +x
          const nLink = map.nodes
            .filter((n) => n.y === node.y && n.x > node.x)
            .map((n) => n.x)
          if (nLink)
            result.push({
              x: Math.min(...nLink),
              y: node.y,
              direction: 'North',
            })
          break

        case 'East': // -y
          const eLink = map.nodes
            .filter((n) => n.x === node.x && n.y < node.y)
            .map((n) => n.y)
          if (eLink)
            result.push({
              x: node.x,
              y: Math.max(...eLink),
              direction: 'East',
            })
          break

        case 'South': // -x
          const sLink = map.nodes
            .filter((n) => n.y === node.y && n.x < node.x)
            .map((n) => n.x)
          if (sLink)
            result.push({
              x: Math.max(...sLink),
              y: node.y,
              direction: 'South',
            })
          break

        case 'West': // +y
          const wLink = map.nodes
            .filter((n) => n.x === node.x && n.y > node.y)
            .map((n) => n.y)
          if (wLink)
            result.push({
              x: node.x,
              y: Math.min(...wLink),
              direction: 'West',
            })
          break
      }
    })

    return result
  }

  const connectedNodePositionList = useMemo(() => {
    if (!selectedNode) return []

    return getConnectedNodePositionList(selectedNode)
  }, [map, selectedNode])

  useEffect(() => {
    if (!selectedAgv) return

    setAgvList((prev) => {
      const newList = { ...prev }
      const turnMap: Direction[] = ['North', 'West', 'South', 'East']

      switch (keyPress) {
        case 'Up':
        case 'Down':
          const direction =
            turnMap[
              (turnMap.indexOf(newList[selectedAgv].heading) +
                (keyPress === 'Up' ? 0 : 2)) %
                4
            ]
          const position = newList[selectedAgv].position
          const node = map.nodes.find(
            (n) => n.x === position.x && n.y === position.y
          )
          const connected = getConnectedNodePositionList(node!)

          const nextNode = connected.find((c) => c.direction === direction)

          newList[selectedAgv] = {
            ...newList[selectedAgv],
            ...(nextNode && { position: { x: nextNode.x, y: nextNode.y } }),
            isMoving: true,
          }
          break

        case 'Left':
          newList[selectedAgv] = {
            ...newList[selectedAgv],
            heading:
              turnMap[(turnMap.indexOf(newList[selectedAgv].heading) + 1) % 4],
          }
          break

        case 'Right':
          newList[selectedAgv] = {
            ...newList[selectedAgv],
            heading:
              turnMap[(turnMap.indexOf(newList[selectedAgv].heading) + 3) % 4],
          }
          break

        default: // stop
          newList[selectedAgv] = {
            ...newList[selectedAgv],
            isMoving: false,
          }
      }

      return newList
    })
  }, [keyPress])

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
        <AgvLayer
          agvList={agvList}
          selectedAgv={selectedAgv}
          onAgvClick={onAgvClick}
          ratio={ratio}
          mapSize={mapSize}
        />
      </Stage>
    </Container>
  )
}

export default MapCanvas
