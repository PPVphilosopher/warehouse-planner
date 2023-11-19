import { Map, Node } from '@/libs/types'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'

const API_PATH = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:3002'

export const useMapQuery = (id: number = 1) =>
  useQuery({
    queryKey: ['map', id],
    queryFn: async () => {
      const res = await fetch(`${API_PATH}/maps/${id}?_embed=nodes`, {
        cache: 'no-cache',
      })

      const data = await res.json()

      return data as Map
    },
  })

export const useSaveNodeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (node: Node) => {
      const res = await fetch(
        `${API_PATH}/nodes${node.id ? `/${node.id}` : ''}`,
        {
          method: node.id ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(node),
        }
      )
      const data = await res.json()
      return data as Node
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('map')
      },
    }
  )
}

export const useDeleteNodeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(
    async (id: number) => {
      const res = await fetch(`${API_PATH}/nodes/${id}`, { method: 'DELETE' })
      return res.ok
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('map')
      },
    }
  )
}
