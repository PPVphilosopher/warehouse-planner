import styled from 'styled-components'

export const Tag = styled.span<{ color?: string; textColor?: string }>(
  ({ color = 'gray', textColor = 'white' }) => ({
    backgroundColor: color,
    color: textColor,
    padding: '3px 5px',
    borderRadius: '5px',
    fontSize: '0.5em',
  })
)
