import styled from "styled-components";

export const Button = styled.button`
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border-radius: 5px;
    /* Color the border and text with theme.main */
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.borderColors};
    background: ${props => props.theme.colors.primary};
`;

export const CustomInput = styled.input`
    background: ${props => props.theme.colors.primary};
    padding: 10px 12px;
    border: 2px solid ${props => props.theme.colors.borderColors};
    border-radius: 8px;
    font-size: 16px;
    font-family: "Rubik Bubbles", system-ui;
    color: ${props => props.theme.colors.text};
`
export const SpanError = styled.span`
    color: ${props => props.theme.colors.error}  
`
export const Container = styled.div`
    min-height: 100px;
    margin-top: 20px;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
`;

