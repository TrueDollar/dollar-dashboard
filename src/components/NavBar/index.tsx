import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { LinkBase, useTheme } from '@aragon/ui';
import ConnectButton from './ConnectButton';

import './style.css'

type NavbarProps = {
  hasWeb3: boolean,
  user: string,
  setUser: Function
}

function NavBar({
  hasWeb3, user, setUser,
}:NavbarProps) {
  const history = useHistory();
  const currentTheme = useTheme();

  const [page, setPage] = useState("");

  useEffect(() => {
    return history.listen((location) => {
      setPage(location.pathname)
    })
  }, [hasWeb3, user, history]);

  const logoUrl = `./logo/logo-${currentTheme._name === 'light' ? 'black' : 'white'}.png`

  return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: 'none',
        textAlign: 'center',
        width: '100%',
        fontSize: '14px'
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <div className="container">
            <div>
              <LinkBase onClick={() => history.push('/')} style={{marginRight: '16px', height: '40px'}}>
                <img src={logoUrl} height="40px" alt="True Seigniorage Dollar"/>
              </LinkBase>
            </div>
            <div className="menu">
              <LinkButton title="DAO" onClick={() => history.push('/dao/')} isSelected={page.includes('/dao')}/>
              <LinkButton title="Liquidity" onClick={() => history.push('/pool/')} isSelected={page.includes('/pool')}/>
              <LinkButton title="Regulation" onClick={() => history.push('/regulation/')} isSelected={page.includes('/regulation')}/>
              <LinkButton title="Governance" onClick={() => history.push('/governance/')} isSelected={page.includes('/governance')}/>
              <LinkButton title="Trade" onClick={() => history.push('/trade/')} isSelected={page.includes('/trade')}/>
              <LinkButton title="Coupons" onClick={() => history.push('/coupons/')} isSelected={page.includes('/coupons')}/>
              <LinkButton title="Epoch" onClick={() => history.push('/epoch/')} isSelected={page.includes('/epoch')}/>
              <LinkButton title="About" onClick={() => history.push('/about/')} isSelected={page.includes('/about')}/>
            </div>
            <div>
              <ConnectButton hasWeb3={hasWeb3} user={user} setUser={setUser} />
            </div>
          </div>
          <div className="menu-mobile">
            <LinkButton title="DAO" onClick={() => history.push('/dao/')} isSelected={page.includes('/dao')}/>
            <LinkButton title="Liquidity" onClick={() => history.push('/pool/')} isSelected={page.includes('/pool')}/>
            <LinkButton title="Regulation" onClick={() => history.push('/regulation/')} isSelected={page.includes('/regulation')}/>
            <LinkButton title="Governance" onClick={() => history.push('/governance/')} isSelected={page.includes('/governance')}/>
            <LinkButton title="Trade" onClick={() => history.push('/trade/')} isSelected={page.includes('/trade')}/>
            <LinkButton title="Coupons" onClick={() => history.push('/coupons/')} isSelected={page.includes('/coupons')}/>
            <LinkButton title="Epoch" onClick={() => history.push('/epoch/')} isSelected={page.includes('/epoch')}/>
            <LinkButton title="About" onClick={() => history.push('/about/')} isSelected={page.includes('/about')}/>
          </div>
        </div>
      </div>
    </>
  );
}


type linkButtonProps = {
  title:string,
  onClick: Function,
  isSelected?:boolean
}

function LinkButton({ title, onClick, isSelected = false }:linkButtonProps) {
  return (
      <LinkBase onClick={onClick} style={{marginLeft: '8px', marginRight: '8px', height: '40px'}}>
        <div style={{ padding: '1%', opacity: isSelected ? 1 : 0.5, fontSize: 17 }}>{title}</div>
      </LinkBase>
  );
}

export default NavBar;
