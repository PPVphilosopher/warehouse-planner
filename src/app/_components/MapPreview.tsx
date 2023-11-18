'use client'

import { Map } from '@/utils/types'

type Props = {
  map: Map
}

export const MapPreview = ({ map }: Props) => {
  console.log('map :', map)
  return <div>map</div>
}
