import { Agv } from '@/libs/types'
import { Container, Row } from './styles'
import { Tag } from '@/components'

type Props = {
  agv?: Agv
}

export const AgvDetail = ({ agv }: Props) => {
  return (
    <Container>
      <Row>Serial: {agv?.serial}</Row>
      <Row>
        X: {agv?.position.x} Y: {agv?.position.y}
      </Row>
      <Row>Heading: {agv?.heading}</Row>
      <Row>
        Battery: {agv?.battery ?? '-'}%
        {agv?.isCharging && <Tag color='orange'>Charging</Tag>}
      </Row>
      <Row>
        Payload: {agv?.payload ?? '-'}kg
        {agv?.isMoving && <Tag color='green'>Moving</Tag>}
      </Row>
      <Row>{agv?.message}</Row>
    </Container>
  )
}
