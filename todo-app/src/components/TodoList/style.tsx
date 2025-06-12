import styled from 'styled-components';

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

const ContainerSort = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`

interface ListSpanProps {
    $status: boolean;
}

const ListSpan = styled.span<ListSpanProps>`
    text-decoration: ${props => props.$status ? 'line-through' : 'none'}
`

export { Button, ContainerSort, ListSpan }