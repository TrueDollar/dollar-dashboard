import React from 'react';
import { LinkBase, useTheme } from '@aragon/ui';
import ChangeModeButton from "./SwitchTheme";
import styled from 'styled-components'

type FooterProps = {
  updateTheme: Function,
  theme: string,
  hasWeb3: boolean,
}

function Footer({updateTheme, theme, hasWeb3}: FooterProps) {
  const currentTheme = useTheme();
  return (
    <>
      <div style={{
        borderTop: '1px solid ' + currentTheme.border,
        backgroundColor: currentTheme.surface,
        textAlign: 'center',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: 'auto',
        width: '100%',
        fontSize: '14px'
      }}>
        <div style={{maxWidth: '1100px', marginLeft: 'auto', marginRight: 'auto'}}>
          <Container>
            {theme === 'light' ? (
                <div className="d-flex justify-content-center">
                  <FooterLink icon={
                    <img src={`./icon/${theme}-github.png`} style={{width: 32}} />
                  } href={"https://github.com/TrueDollar"}/>
                  <FooterLink icon={
                    <img src={`./icon/${theme}-twitter.png`} style={{width: 32}} />
                  } href={"https://twitter.com/TrueSeigniorage"}/>
                  <FooterLink icon={
                    <img src={`./icon/${theme}-m.png`} style={{width: 32}} />} href={"https://trueseigniorage.medium.com/"}/>
                  <FooterLink icon={
                    <img src={`./icon/${theme}-tele.png`} style={{width: 32}} />} href={"https://t.me/TrueSeigniorageDollar"}/>
                  <FooterLink icon={
                    <img src={`./icon/${theme}-discord.png`} style={{width: 32}} />} href={"https://discord.gg/crRpm474gu"}/>
                  <div style={{ marginTop: 5, display: 'flex', alignItems: 'center' }}>
                    <Icon src={`./icon/${theme}-coingecko.png`} style={{width: 32}}
                          onClick={() => window.open('https://www.coingecko.com/en/coins/true-seigniorage-dollar', '_blank')}
                    />
                    <Icon src={`./icon/${theme}-coinmarketcap.png`} style={{width: 32}}
                          onClick={() => window.open('https://coinmarketcap.com/currencies/true-seigniorage-dollar/', '_blank')}
                    />
                  </div>
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                  <FooterLink icon={<i className="fab fa-github"/>} href={"https://github.com/TrueDollar"}/>
                  <FooterLink icon={<i className="fab fa-twitter"/>} href={"https://twitter.com/TrueSeigniorage"}/>
                  <FooterLink icon={<i className="fab fa-medium"/>} href={"https://trueseigniorage.medium.com/"}/>
                  <FooterLink icon={<i className="fab fa-telegram"/>} href={"https://t.me/TrueSeigniorageDollar"}/>
                  <FooterLink icon={<i className="fab fa-discord"/>} href={"https://discord.gg/crRpm474gu"}/>
                  <div style={{ marginTop: 5 }}>
                    <Icon src="./images/coingecko.ico"
                          onClick={() => window.open('https://www.coingecko.com/en/coins/true-seigniorage-dollar', '_blank')}
                    />
                    <Icon src="./images/coinmarketcap.png"
                          onClick={() => window.open('https://coinmarketcap.com/currencies/true-seigniorage-dollar/', '_blank')}
                    />
                  </div>
                </div>
            )}

            <div>
            </div>
           <ContainerTeam>
             <div style={{ marginRight: 5 }}>
               Made with <span role="img" aria-labelledby="heartbreak">💔️</span> by TSD team!
             </div>
             <ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme} />
           </ContainerTeam>
          </Container>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;

  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerTeam = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 522px) {
    justify-content: center;
  }
`

const Icon = styled.img`
  margin: 0 5px;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #ffffff;
  width: 30px;
  cursor: pointer;
`

type FooterLinkProp = {
  icon: any,
  href: string,
}

function FooterLink({
  icon, href,
}:FooterLinkProp) {
  return (
    <LinkBase href={href} style={{marginLeft: '4px', marginRight: '4px'}}>
      <span style={{ fontSize: 32 }}>{icon}</span>
    </LinkBase>
  );
}

export default Footer;
