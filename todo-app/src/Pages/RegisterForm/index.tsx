import { Container, GroupContainer, Header, LogoDiv, LogoSpan, LogoBtnContainer, LogoBtn } from "./style"

export default function RegisterForm() {

    return (
        <Container>
            <GroupContainer>
                <Header>
                    <LogoDiv>
                        <LogoSpan>
                            Your ToDo
                        </LogoSpan>
                        <LogoBtnContainer>
                            <LogoBtn to='/register'>регистрация</LogoBtn>
                            <LogoBtn to='/login'>вход</LogoBtn>
                        </LogoBtnContainer>
                    </LogoDiv>
                </Header>
            </GroupContainer>
        </Container>
    )
}






