import React from 'react';
import {LinkBase, useTheme} from '@aragon/ui';
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
      <FooterContainer
        style={{
          borderTop: '1px solid ' + currentTheme.border,
          backgroundColor: currentTheme.surface,
      }}
      >
        <div style={{maxWidth: '1520px', marginLeft: 'auto', marginRight: 'auto', height: '100%'}}>
          <Container>
            <div className="d-flex justify-content-center">
              <FooterLink icon={
                <Icon src={`./icon/${theme}-github.png`}/>
              } href={"https://github.com/TrueDollar"}/>
              <FooterLink icon={
                <Icon src={`./icon/${theme}-twitter.png`}/>
              } href={"https://twitter.com/TrueSeigniorage"}/>
              <FooterLink icon={
                <Icon src={`./icon/${theme}-m.png`}/>} href={"https://trueseigniorage.medium.com/"}/>
              <FooterLink icon={
                <Icon src={`./icon/${theme}-tele.png`}/>} href={"https://t.me/TrueSeigniorageDollar"}/>
              <FooterLink icon={<Icon src={`./icon/${theme}-discord.png`}/>} href={"https://discord.gg/crRpm474gu"}/>
              <FooterLink icon={<Icon src={`./icon/${theme}-coinmarketcap.png`}/>}
                          href={"https://coinmarketcap.com/currencies/true-seigniorage-dollar/"}/>
              <FooterLink icon={<Icon src={`./icon/coingecko.png`}/>}
                          href={"https://www.coingecko.com/en/coins/true-seigniorage-dollar"}/>
            </div>
            <ButtonDesktop>
              <ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme}/>
            </ButtonDesktop>
            <ContainerTeam>
              <ButtonMobile>
                <ChangeModeButton hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme}/>
              </ButtonMobile>
              <div>
                Made with <span className="mx-2" role="img" aria-labelledby="heartbreak"><img
                src="./icon/heart.png"/>️</span> by TSD team!
              </div>
            </ContainerTeam>
          </Container>
        </div>
      </FooterContainer>
    </>
  );
}

const FooterContainer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  height: 90px;
  width: 100%;
  padding: 0 20px;
  @media (max-width: 768px) {
    display: block;
    height: auto;
  }
`

const ButtonDesktop = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

const ButtonMobile = styled.div`
        display: none;
  @media (max-width: 768px) {
    display: block;
    margin-right: 10px;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  height: 100%;

  @media (max-width: 768px) {
    display: block;
  }
`

const ContainerTeam = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;

  @media (max-width: 768px) {
    margin-top: 10px;
    justify-content: center;
  }
`

const Icon = styled.img`
  width: 32px;
  height: 32px;
`

type FooterLinkProp = {
  icon: any,
  href: string,
}

function FooterLink({
                      icon, href,
                    }: FooterLinkProp) {
  return (
    <LinkBase href={href} style={{marginRight: '20px'}}>
      {icon}
    </LinkBase>
  );
}

export default Footer;
