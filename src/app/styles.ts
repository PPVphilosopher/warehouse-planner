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
})

export const Main = styled.div({
  backgroundColor: 'lightgray',
  overflow: 'hidden',
})
