import styled from "styled-components";
import { NavLink } from 'react-router-dom';

export const Container = styled.section`
    margin: auto;
    width: 600px;
    height: 350px;
    border: solid 1px lightgray;
    border-radius: 20px;
    box-shadow: 0 5px 15px lightgray;
`

export const GroupContainer = styled.div`
    margin: auto;
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

    &.active {
    color: pink;
    font-weight: 500;
    border-bottom: 1px solid pink;
    }
`