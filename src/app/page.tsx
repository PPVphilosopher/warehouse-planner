'use client'

import { MapCanvas } from '@/components'
import {
  useDeleteNodeMutation,
  useMapQuery,
  useSaveNodeMutation,
} from '@/libs/api'
import { Agv, Direction, KeyboardDirection, Node } from '@/libs/types'
import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AgvDetail, NodeDetail, NodeEditor, NodeList } from './_components'
import { Container, LeftBar, Main, ModeDisplay, ToolBox } from './styles'

export default function Home() {
  const { data } = useMapQuery()
  const { mutateAsync: saveNode } = useSaveNodeMutation()
  const { mutateAsync: deleteNode } = useDeleteNodeMutation()

  const [keyPress, setKeyPress] = useState<KeyboardDirection>()
  const [mode, setMode] = useState<'edit' | 'play'>('edit')
  const [selectedNode, setSelectedNode] = useState<Node>()
  const [selectedAgv, setSelectedAgv] = useState<string>('')
  const [agvList, setAgvList] = useState<Record<string, Agv>>({})

  const onNodeSelect = useCallback((node: Node) => {
    setSelectedNode((prev) => (node.id === prev?.id ? undefined : node))
  }, [])

  const onAgvSelect = useCallback((agv: Agv) => {
    setSelectedAgv((prev) => (prev === agv.serial ? '' : agv.serial))
  }, [])

  const onSave = useCallback(async (node: Node) => {
    const res = await saveNode(node)
    if (res) {
      alert(node.id ? 'Node updated' : 'Node added')
      setSelectedNode(res)
    }
  }, [])

  const onDelete = useCallback(async (id: number) => {
    const res = await deleteNode(id)
    if (res) alert('Node deleted')
  }, [])

  const onToggleMode = () => {
    if (mode === 'edit') {
      setMode('play')
    } else {
      if (
        !Object.values(agvList).length ||
        confirm('All AGV will be removed when switch to edit mode')
      ) {
        setSelectedAgv('')
        setAgvList({})
        setMode('edit')
      }
    }
  }

  const onSpawn = (node: Node) => {
    const agv: Agv = {
      serial: uuidv4().substring(0, 22),
      battery: 20 + Math.round(Math.random() * 80), // 20-100
      payload: Math.round(Math.random() * 800), // 0-800
      position: { x: node.x, y: node.y },
      heading: node.directions?.[0] ?? 'North',
      isCharging: false,
      isMoving: false,
      message: '',
    }

    if (agv.battery < 50)
      agv.message =
        'Battery level is low, need charging. Maintenance is overdue, need immediate intensive care.'

    setAgvList((prev) => ({ ...prev, [agv.serial]: agv }))
    setSelectedAgv(agv.serial)
  }

  useEffect(() => {
    const agv = agvList[selectedAgv]
    if (!agv) return

    const node = data?.nodes.find(
      (n) => n.x === agv.position.x && n.y === agv.position.y
    )

    setSelectedNode(node)

    if (
      (node?.charger && !agv.isCharging) ||
      (!node?.charger && agv.isCharging)
    ) {
      setAgvList((prev) => ({
        ...prev,
        [selectedAgv]: { ...agv, isCharging: Boolean(node?.charger) },
      }))
    }
  }, [data, agvList[selectedAgv]])

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (mode === 'edit') return

      setKeyPress((prev) => {
        if (prev) return prev

        switch (e.key) {
          case 'w':
          case 'ArrowUp':
            return 'Up'

          case 'd':
          case 'ArrowRight':
            return 'Right'

          case 's':
          case 'ArrowDown':
            return 'Down'

          case 'a':
          case 'ArrowLeft':
            return 'Left'
        }

        return prev
      })
    },
    [mode]
  )

  const onKeyUp: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (mode === 'edit') return

      setKeyPress((prev) => {
        if (!prev) return undefined

        switch (e.key) {
          case 'w':
          case 'ArrowUp':
            if (prev === 'Up') return undefined
            break

          case 'd':
          case 'ArrowRight':
            if (prev === 'Right') return undefined
            break

          case 's':
          case 'ArrowDown':
            if (prev === 'Down') return undefined
            break

          case 'a':
          case 'ArrowLeft':
            if (prev === 'Left') return undefined
            break
        }

        return prev
      })
    },
    [mode]
  )

  if (!data) return null
  return (
    <Container tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
      <LeftBar>
        <ModeDisplay>
          Mode: {mode}
          <button onClick={onToggleMode}>
            switch to {mode === 'edit' ? 'play' : 'edit'} mode
          </button>
        </ModeDisplay>
        {mode === 'play' && <AgvDetail agv={agvList[selectedAgv]} />}

        {mode === 'edit' ? (
          <NodeEditor
            node={selectedNode}
            onSave={onSave}
            onCancel={() => setSelectedNode(undefined)}
            onDelete={onDelete}
          />
        ) : (
          <NodeDetail node={selectedNode} onSpawn={onSpawn} />
        )}
        <NodeList
          list={data.nodes}
          selectedNode={selectedNode}
          onNodeClick={onNodeSelect}
        />
      </LeftBar>
      <Main>
        <ToolBox></ToolBox>
        <MapCanvas
          map={data}
          selectedNode={selectedNode}
          onNodeClick={onNodeSelect}
          agvList={agvList}
          setAgvList={setAgvList}
          selectedAgv={selectedAgv}
          onAgvClick={onAgvSelect}
          keyPress={keyPress}
        />
      </Main>
    </Container>
  )
}
