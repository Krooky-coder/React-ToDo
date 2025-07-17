import type { ReactNode } from "react";
import { HeaderDiv } from "./style";

interface HeaderProps {
    children: ReactNode;
};

export default function Header ({ children }: HeaderProps) {
    return (
    <HeaderDiv>
        {children}
        <span>YouR's ToDo</span>
    </HeaderDiv>
    );
};