import styled from "styled-components";

export const ToggleIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    width: 100%;
    height: 100%;
    fill: ${props => props.theme.main};
`;