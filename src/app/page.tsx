'use client'

import { MapCanvas } from '@/components'
import {
  useDeleteNodeMutation,
  useMapQuery,
  useSaveNodeMutation,
} from '@/libs/api'
import { Node } from '@/libs/types'
import { useCallback, useState } from 'react'
import { NodeDetail, NodeList } from './_components'
import { Container, LeftBar, Main } from './styles'

export default function Home() {
  const { data } = useMapQuery()
  const { mutateAsync: saveNode } = useSaveNodeMutation()
  const { mutateAsync: deleteNode } = useDeleteNodeMutation()

  const [selectedNode, setSelectedNode] = useState<Node>()

  const onNodeSelect = useCallback((node: Node) => {
    setSelectedNode((prev) => (node.id === prev?.id ? undefined : node))
  }, [])

  const onSave = useCallback(async (node: Node) => {
    const res = await saveNode(node)
    if (res) alert(node.id ? 'Node updated' : 'Node added')
  }, [])

  const onDelete = useCallback(async (id: number) => {
    const res = await deleteNode(id)
    if (res) alert('Node deleted')
  }, [])

  if (!data) return null
  return (
    <Container>
      <LeftBar>
        <NodeDetail
          node={selectedNode}
          onSave={onSave}
          onCancel={() => setSelectedNode(undefined)}
          onDelete={onDelete}
        />
        <NodeList
          list={data.nodes}
          selectedNode={selectedNode}
          onNodeClick={onNodeSelect}
        />
      </LeftBar>
      <Main>
        <MapCanvas
          map={data}
          selectedNode={selectedNode}
          onNodeClick={onNodeSelect}
        />
      </Main>
    </Container>
  )
}
