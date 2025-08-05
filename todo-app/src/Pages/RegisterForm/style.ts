import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const Container = styled.section`
    margin: auto;
    border: solid 1px lightgray;
    border-radius: 20px;
    box-shadow: 0 5px 15px lightgray;
`

export const GroupContainer = styled.div`
    margin: auto;
    width: 300px;
`
export const Header = styled.div`
    margin-top: 40px;
`

export const LogoDiv = styled.div`
    
`

export const LogoSpan = styled.span`
    font-size: 30px;
`

export const LogoBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
`

export const LogoBtn = styled(NavLink)`
    background-color: white;
    margin: auto 0 10px;
    padding: 7px 3px 5px;
    border-radius: 0;
    text-transform: uppercase;
    color: black;
    font-size: medium;
    border-bottom: 2px solid white; 

    &.active {
    color: pink;
    font-weight: 500;
    border-bottom: 2px solid pink;
    }
`
export const Body = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`

export const LogForm = styled.input`
    height: 21px;
    border: 1px solid lightgrey;
    font-size: 10px;
    margin-top: 15px;

    &:focus {
    border: 1px solid black;
    border-radius: 2px;
    outline: none;
  }
`

export const ShowPass = styled.button`
    display: flex;
    justify-content: center;
    item-align: center;
    font-size: 12px;
    margin: 0;
    outline: none;
    padding: 7px;
    width: 25px;
    height: 25px;
`
export const ShowPassBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 23px;
    height: 22px;
    position: relative;
    left: 92%;
    bottom: 62px;
    right: 1px;
    background-color: white;
    border: none;
    outline: none;
    margin: 0;

    &:focus {
        border: none;
        outline: none;
    }
`

export const EyeIcon = styled.svg.attrs({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
  })` 
    fill: none;
    stroke: #323232;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

export const RegisterBtn = styled.button`
    background-color: lightpink;
    height: 30px;
    text-align: center;
    font-size: 12px;
    text-transform: uppercase;
    color: white;
    border-radius: 0px;
    margin: 0;
    margin-bottom: 40px;

    &:focus {
        outline: none;
        border: none;
    }

    &:hover {
        border: 1px solid black;
    }

    &:active {
        background-color: black;
    }
`
export const ErrorSpan = styled.span`
    font-size: 12px;
    color: red;
    position: absolute;
`