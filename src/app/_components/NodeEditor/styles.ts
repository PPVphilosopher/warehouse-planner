import styled from 'styled-components'

export const Container = styled.div({
  padding: '10px',
})

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
})

export const Field = styled.div({
  display: 'flex',
  gap: '5px',

  '>label': {
    display: 'flex',
    gap: '5px',
  },
})
