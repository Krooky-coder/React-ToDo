import styled from "styled-components";

const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.main};
    background: ${props => props.theme.colors.primary};
`;

const ButtonThemeChange = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: solid 1px ${props => props.theme.main};
  cursor: pointer;
  padding: 7px;

  &:focus {
    outline: none
  }
`;
const ToggleIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.main};
`;
const CustomInput = styled.input`
    background: ${props => props.theme.colors.primary};
    padding: 10px 12px;
    border: 2px solid ${props => props.theme.main};
    border-radius: 8px;
    font-size: 16px;
    font-family: "Rubik Bubbles", system-ui;
    color: ${props => props.theme.colors.text};
`

export { Button, ButtonThemeChange, ToggleIcon, CustomInput }