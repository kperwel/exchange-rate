import React from "react";
import styled from "styled-components";

const ContainerStyled = styled.div`
    max-width: 620px;
    margin: 0 auto;
    width: 100%;
`;

const MainLayoutStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const ContentStyled = styled.div`
    padding: 20px;
    margin: 20px;
`;

interface MainLayoutProps {
    headerProvider: () => React.ReactNode;
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => (
    <MainLayoutStyled>
        <ContainerStyled>
            <ContentStyled>
                {children}
            </ContentStyled>
        </ContainerStyled>
    </MainLayoutStyled>
)

export default MainLayout;