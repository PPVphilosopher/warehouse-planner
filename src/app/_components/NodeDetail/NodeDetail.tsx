import { Node } from '@/libs/types'
import { Container, Row } from './styles'
import { NodeTag } from '@/components'

type Props = {
  node?: Node
  onSpawn: (node: Node) => void
}

export const NodeDetail = ({ node, onSpawn }: Props) => {
  return (
    <Container>
      <Row>
        Name: {node?.name}
        {node && <NodeTag node={node} />}
      </Row>
      <Row>
        Code: {node?.code}{' '}
        {node?.spawn && (
          <button onClick={() => onSpawn(node)}>Spawn AGV</button>
        )}
      </Row>
      <Row>
        X: {node?.x} Y: {node?.y}
      </Row>
      <Row>Direction: {node?.directions?.join()}</Row>
    </Container>
  )
}
