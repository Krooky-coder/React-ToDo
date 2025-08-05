import styled from "styled-components";

export const Container = styled.section`
  border: 2px solid ${props => props.theme.main};
  border-radius: 15px;
  background: ${props => props.theme.colors.background};
  padding: 0px;
  margin: 0px;
  height: 650px;
  color: ${props => props.theme.colors.text};
`

export const Header = styled.div`
    position: relative;
    margin-bottom: 40px;
`

export const Span = styled.span`
    font-size: 32px;
`

export const ProfileDiv = styled.div`
    margin-bottom: 40px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
`

export const Ul = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
  
    li {
        padding: 12px 20px;
        border-bottom: 1px solid ${props => props.theme.colors.background || "#e0e0e0"};
        display: flex;
        align-items: center;
    }
  }
`

export const InputsDiv = styled.div`
    display: flex;
    flex-direction: column;
`

export const ChangePassDiv = styled.div`
    display: flex;
    justify-content: space-around;
    position: relative;
`

export const ChangePassBtn = styled.button`
    margin: 0;
`
export const PassP = styled.p`
    margin: 0;
    margin-top: 5px;
`

export const CustomInput = styled.input`
    background: ${props => props.theme.colors.primary};
    padding: 10px 12px;
    border: 2px solid ${props => props.theme.main};
    border-radius: 8px;
    font-size: 16px;
    font-family: "Rubik Bubbles", system-ui;
    color: ${props => props.theme.colors.text};
`

export const ErrorSpan = styled.span`
    color: red;
    position: absolute;
    top: -30px;
`