import { Direction, Node } from '@/libs/types'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container, Field, Form } from './styles'
import { MAP_MAX_SIZE } from '@/libs/constants'

type Props = {
  node?: Node
  onSave: (node: Node) => void
  onCancel: () => void
  onDelete: (id: number) => void
}

type NodeFormInput = {
  name: string
  code: string
  x: string
  y: string
  directions: Direction[]
  mode: '' | 'spawn' | 'charger' | 'chute'
  modeDirection: '' | Direction
}

export const NodeEditor = ({ node, onSave, onCancel, onDelete }: Props) => {
  const { register, handleSubmit, setValue, reset } = useForm<NodeFormInput>()

  useEffect(() => {
    setValue('name', node?.name || '')
    setValue('code', node?.code.toString() || '')
    setValue('x', node?.x.toString() || '')
    setValue('y', node?.y.toString() || '')
    setValue('directions', node?.directions || [])
    setValue(
      'mode',
      node?.spawn
        ? 'spawn'
        : node?.charger
        ? 'charger'
        : node?.chute
        ? 'chute'
        : ''
    )
    setValue(
      'modeDirection',
      node?.charger?.direction || node?.chute?.direction || ''
    )
  }, [node])

  const onSubmit: SubmitHandler<NodeFormInput> = (data) => {
    if (['charger', 'chute'].includes(data.mode) && data.modeDirection === '') {
      alert('please select mode direction')
      return
    }

    const newNode: Node = {
      id: node?.id ?? 0,
      mapId: node?.mapId ?? 1, // hardcode
      name: data.name.trim(),
      code: +data.code,
      x: +data.x,
      y: +data.y,
      directions: data.directions,
      ...(data.mode === 'spawn' && { spawn: true }),
      ...(data.mode === 'charger' && {
        charger: { direction: data.modeDirection as Direction },
      }),
      ...(data.mode === 'chute' && {
        chute: { direction: data.modeDirection as Direction },
      }),
    }

    if (isNaN(newNode.code) || isNaN(newNode.x) || isNaN(newNode.y)) {
      alert('please check input value')
      return
    }

    if (!newNode.name) delete newNode.name

    onSave(newNode)
  }

  const onCancelClick = () => {
    reset()
    onCancel()
  }

  const onDeleteClick = () => {
    if (!node) return

    if (confirm(`delete ${node.name ?? node.code}`)) {
      onDelete(node.id)
      onCancelClick()
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Field>
          <label>
            Name:
            <input {...register('name')} />
          </label>
        </Field>
        <Field>
          <label>
            Code:
            <input type='number' {...register('code')} required />
          </label>
        </Field>
        <Field>
          <label>
            X:
            <input
              type='number'
              max={MAP_MAX_SIZE}
              {...register('x')}
              required
            />
          </label>
        </Field>
        <Field>
          <label>
            Y:
            <input
              type='number'
              max={MAP_MAX_SIZE}
              {...register('y')}
              required
            />
          </label>
        </Field>
        <Field>
          <label>Directions: </label>
          <label>
            <input type='checkbox' value='North' {...register('directions')} />N
          </label>
          <label>
            <input type='checkbox' value='East' {...register('directions')} />E
          </label>
          <label>
            <input type='checkbox' value='South' {...register('directions')} />S
          </label>
          <label>
            <input type='checkbox' value='West' {...register('directions')} />W
          </label>
        </Field>
        <Field>
          <label>Mode: </label>
          <select {...register('mode')}>
            <option value=''>-</option>
            <option value='spawn'>Spawn</option>
            <option value='charger'>Charger</option>
            <option value='chute'>Chute</option>
          </select>
        </Field>
        <Field>
          <label>Mode direction: </label>
          <select {...register('modeDirection')}>
            <option value=''>-</option>
            <option value='North'>North</option>
            <option value='East'>East</option>
            <option value='South'>South</option>
            <option value='West'>West</option>
          </select>
        </Field>
        <Field>
          <button type='submit'>{node?.id ? 'Update' : 'Add'}</button>
          <button type='button' onClick={onCancelClick}>
            Cancel
          </button>
          {node?.id && (
            <button type='button' onClick={onDeleteClick}>
              Delete
            </button>
          )}
        </Field>
      </Form>
    </Container>
  )
}
