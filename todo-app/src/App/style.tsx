import styled from "styled-components"

const Container = styled.div`
  border: 2px solid ${props => props.theme.main};
  border-radius: 15px;
  background: ${props => props.theme.colors.background};
  padding: 0px;
  margin: 0px;
  width: 60%;
  color: ${props => props.theme.colors.text};
`
export { Container }