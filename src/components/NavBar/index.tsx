import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components'

import {LinkBase, useTheme} from '@aragon/ui';
import ConnectButton from './ConnectButton';

import Menu from "./Menu";
import './style.css'

type NavbarProps = {
  hasWeb3: boolean,
  user: string,
  setUser: Function,
  theme: string
}

function NavBar({
                  hasWeb3, user, setUser, theme
                }: NavbarProps) {
  const history = useHistory();
  const currentTheme = useTheme();

  const [page, setPage] = useState(history.location.pathname);

  useEffect(() => {
    return history.listen((location) => {
      setPage(location.pathname)
    })
  }, [hasWeb3, user, history]);

  const logoUrl = `./logo/logo-${currentTheme._name === 'light' ? 'black' : 'white'}.png`

  return (
    <>
      <Header theme={theme}>
        <div style={{maxWidth: '1520px', marginLeft: 'auto', marginRight: 'auto', height: '100%'}}>
          <Container>
            <div className="logo">
              <LinkBase onClick={() => history.push('/')} style={{marginRight: '16px', height: '40px'}}>
                <img src={logoUrl} height="40px" alt="True Seigniorage Dollar"/>
              </LinkBase>
            </div>
            <div className="menu text-center">
              <Menu history={history} page={page}/>
            </div>
            <div>
              <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser}/>
            </div>
          </Container>
          <div className="menu-mobile text-center">
            <Menu history={history} page={page}/>
          </div>
        </div>
      </Header>
    </>
  );
}

const Header = styled.div`
  height: 90px;
  box-shadow: 0px 3px 6px #00000029;
  // background-color: ${({theme}) => theme === 'light' ? '#FFFFFF' : '#151515'};
  @media (max-width: 768px) {
    height: auto;
    padding: 20px 0;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
`

export default NavBar;
