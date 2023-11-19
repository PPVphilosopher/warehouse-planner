export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export type KeyboardDirection = 'Up' | 'Right' | 'Down' | 'Left'
export type Direction = 'North' | 'East' | 'South' | 'West'

export type Node = Position & {
  id: number
  mapId: number

  code: number
  name?: string

  directions?: Direction[]
  charger?: { direction: Direction }
  chute?: { direction: Direction }
  spawn?: boolean
}

export type Map = {
  id: number
  maxNeighborDistance: number

  nodes: Node[]
}

export type Agv = {
  serial: string
  battery: number
  payload: number
  position: Position
  heading: Direction
  isCharging: boolean
  isMoving: boolean
  message: string
}
