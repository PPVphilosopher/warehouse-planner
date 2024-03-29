import styled from 'styled-components'

export const List = styled.div({
  overflow: 'auto',
  borderTop: '1px solid gray',
})

export const NodeItem = styled.div<{ selected: boolean }>(({ selected }) => ({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 10px',
  borderBottom: '1px solid lightgray',
  cursor: 'pointer',
  backgroundColor: selected ? 'lightskyblue' : 'unset',
}))
