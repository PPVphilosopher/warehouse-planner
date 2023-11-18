import { getMap } from '@/utils/api'
import { MapPreview } from './_components'

export default async function Home() {
  const map = await getMap()

  return (
    <div>
      <MapPreview map={map} />
    </div>
  )
}
