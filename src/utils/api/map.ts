import { Map } from '@/utils/types'

const API_PATH = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:3002'

export const getMap = async (id: number = 1): Promise<Map> => {
  const res = await fetch(`${API_PATH}/maps/${id}?_embed=nodes`, {
    cache: 'no-cache',
  })

  return res.json()
}
