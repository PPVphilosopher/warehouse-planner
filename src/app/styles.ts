import styled from 'styled-components'

export const Container = styled.div({
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  overflow: 'auto',
})

export const LeftBar = styled.div({
  overflow: 'hidden',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid gray',
})

export const ModeDisplay = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid gray',
  padding: '10px',
  fontWeight: 'bold',
})

export const Main = styled.div({
  backgroundColor: 'lightgray',
  overflow: 'hidden',
  display: 'grid',
  gridTemplateRows: '41px 1fr',
})

export const ToolBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
  borderBottom: '1px solid gray',
  padding: '10px',

  '>a:last-of-type': {
    marginLeft: 'auto',
  },
})
