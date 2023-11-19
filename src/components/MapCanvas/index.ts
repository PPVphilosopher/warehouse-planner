import dynamic from 'next/dynamic'

export const MapCanvas = dynamic(() => import('./MapCanvas'), {
  ssr: false,
})
