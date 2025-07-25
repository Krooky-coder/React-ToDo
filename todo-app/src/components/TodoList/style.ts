import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.main};
    background: ${props => props.theme.colors.primary};
`;

export const ContainerSort = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`
interface CustomButton {
    $active: boolean
}

export const ButtonPages = styled.button<CustomButton>`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 7px;
    font-size: small;
    border: black solid 1px;
    text-align: center;
    background-color: ${(props) => (props.$active ? props.theme.main : 'white')};
    color: ${(props) => (props.$active ? props.theme.colors.text : props.theme.colors.secondary)};    
`

interface ListSpanProps {
    $status: boolean;
}

export const ListSpan = styled.span<ListSpanProps>`
    text-decoration: ${props => props.$status ? 'line-through' : 'none'}
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
    border: 2px solid black; 

    &.active {
    color: pink;
    font-weight: 500;
    border-bottom: 2px solid pink;
    }
`