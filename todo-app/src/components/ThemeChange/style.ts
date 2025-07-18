import styled from "styled-components";

export const ButtonThemeChange = styled.button`
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
export const ToggleIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.main};
`;
