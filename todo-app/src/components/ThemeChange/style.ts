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
