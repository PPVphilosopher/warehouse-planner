import styled from 'styled-components'

export const List = styled.div({
  overflow: 'auto',
  borderTop: '1px solid lightgray',
})

export const NodeItem = styled.div<{ active: boolean }>(({ active }) => ({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 10px',
  borderBottom: '1px solid lightgray',
  cursor: 'pointer',
  backgroundColor: active ? 'lightskyblue' : 'unset',
}))
