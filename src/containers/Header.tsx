import React from 'react';
import Big from 'big.js';
import { Flag } from '../components';
import styled from 'styled-components';

const HeaderContentStyled = styled.div`
    display: flex;
    align-items: center;
`;

const FlagStyled = styled.img`
    height: 1em;
    margin: 5px;
`

interface HeaderProps {
    currency: string,
    balance: Big;
}

const customFlagProvider = (src: string, currency: string) => (
    <FlagStyled src={src} title={`Flag for ${currency}`} alt={`${currency}`} />
)

const Header = ({ currency, balance }: HeaderProps) => (
    <HeaderContentStyled>
        <Flag customRenderProvider={customFlagProvider}  currency={currency} />Balance {balance.toFixed(2)} {currency}
    </HeaderContentStyled>
)

export default Header;