import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const ProfileIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    fill: none;
    stroke: ${props => props.theme.colors.borderColors};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    cursor: pointer;
`;

export const ProfileBtn = styled.button`
    background-color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 35px;
    margin: 0;
    border-radius: inherit;

    &: active {
        background-color: black;
    }

    &: focus {
        outline: none;
    }
`
export const ProfileNav = styled(NavLink)`
    background-color: ${props => props.theme.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px;
    width: 23px;
    padding: 5px;
    margin: 0;
    border-radius: inherit;

    &: active {
        background-color: black;
    }

    &: focus {
        outline: none;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 33px;
    border: 1px solid ${props => props.theme.colors.borderColors};
    background-color: inherit;
    padding: 0;
    right: 0;
    top: 0;
    margin: 10px;
    position: absolute;   
`