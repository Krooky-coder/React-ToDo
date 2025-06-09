import styled from "styled-components"

const HeaderDiv = styled.div`
    font-size: 35px;
    color: ${props => props.theme.colors.text};
      margin-bottom: 50px;
`

export default function Header () {

    return (
    <HeaderDiv>
        <span>YouR's ToDo</span>
    </HeaderDiv>)

}