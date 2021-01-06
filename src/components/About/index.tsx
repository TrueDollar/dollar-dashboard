import React from 'react';
import styled from 'styled-components'

function About() {
  return <Container>
    <Title>Introducing True Seigniorage Dollar</Title>
    <Text>True Seigniorage Dollar is a decentralized, oracle data driven stablecoin which uses a supply elasticity
      method around a Time Weighted Average Price (TWAP) oracle for price stability. It’s an algorithmic stablecoin
      which uses TWAP to stabilize the price. Our goal is to maintain the price $TSD = 1 USD in long term.</Text>
    <Logo
      src="./logo/logo_center.png"
      alt="True Seigniorage Dollar"
    />
    <TextSub>Logo True Seigniorage Dollar</TextSub>
    <div>
      <Text>
        Token: <a
        href="https://etherscan.io/token/0x4846239fdf4d4c1aeb26729fa064b0205aca90e1"
        target="_blank"
        rel="noopener noreferrer"
      >https://etherscan.io/token/0x4846239fdf4d4c1aeb26729fa064b0205aca90e1</a>
      </Text>
      <Text>
        Website: <a
        rel="noopener noreferrer"
        href="https://truedollar.finance"
        target="_blank"
      >https://truedollar.finance</a>
      </Text>
      <Text>
        Twitter: <a
        href="https://twitter.com/TrueSeigniorage"
        target="_blank"
        rel="noopener noreferrer"
      >https://twitter.com/TrueSeigniorage</a>
      </Text>
      <Text>
        Telegram: <a
        href="https://t.me/TrueSeigniorageDollar"
        target="_blank"
        rel="noopener noreferrer"
      >https://t.me/TrueSeigniorageDollar</a>
      </Text>
      <Text>
        Github: <a
        href="https://github.com/TrueDollar"
        target="_blank"
        rel="noopener noreferrer"
      >https://github.com/TrueDollar</a>
      </Text>
      <Text>
        Dextools: <a
        href="https://www.dextools.io/app/uniswap/pair-explorer/0x55b0c2eee5d48af6d2a65507319d20453e9f97b6"
        target="_blank"
        rel="noopener noreferrer"
      >https://www.dextools.io/app/uniswap/pair-explorer/0x55b0c2eee5d48af6d2a65507319d20453e9f97b6</a>
      </Text>
    </div>
    <div>
      <TitleSub>Basics</TitleSub>
      <ul style={{marginLeft: 40}}>
        <TextBasic>Epoch Length: 3,600 Seconds (1 Hour)</TextBasic>
        <TextBasic>Advance incentive: 25 TSD</TextBasic>
        <TextBasic>DAO Lockup: 72 Epochs</TextBasic>
        <TextBasic>LP Lockup: 24 Epochs</TextBasic>
        <TextBasic>Source: Uniswap USDC/TSD pair</TextBasic>
        <TextBasic>Method: <a
          rel="noopener noreferrer"
          href="https://uniswap.org/docs/v2/core-concepts/oracles/"
          target="_blank"
        >Uniswap V2 Time
          Weighted Average Price (TWAP)</a></TextBasic>
        <TextBasic>Oracle Minimum: 10,000 USDC</TextBasic>
        <TextBasic>Period: 1 Epoch (1 Hour)</TextBasic>
      </ul>
    </div>
    <div>
      <TitleSub>Governance</TitleSub>
      <Text>True Seigniorage Dollar Protocol allows the community to submit proposals and vote for any changes, either
        removing existing features, adding new features or adjust peripheral functionality. The voting can be done by
        the TSD token holders. At the protocol launch, there will be no admin keys or any way to influence it without
        changes being actioned by a governance process. This made TSD a fully decentralized protocol from unset.</Text>
    </div>
    <div>
      <TitleSub>Our Plan</TitleSub>
      <Text>We will launch TSD at 4:00 GMT+0 / 1 January 2021</Text>
      <Text>Our plan is to pre-mine only a small number of tokens (half amount of ESD and DSD premined) and they will be
        placed in lock for DAO rewards and also will be used for the initial liquidity for the USDC/TSD paid. These
        tokens are locked up hence there are no hidden supplies!</Text>
    </div>
    <div>
      <TitleSub>Why TSD?</TitleSub>
      <Text>We believe in the future of algorithm stablecoins like $ESD, $DSD. We also see the problem that long epoch
        time can lead to unstable value of the tokens. This is our experiment to explorer whether fast epoch time can
        adjust the price better or not. So please DYOR before investing in our project.</Text>
    </div>
  </Container>
}

const Container = styled.div`
  padding: 1% 15px;
`

const Title = styled.h1`
  margin-top: 10px;
  font-size: 52px;
  text-align: center;
  font-weight: bold;
`

const TitleSub = styled.h1`
  margin-top: 24px;
  font-size: 21px;
  font-weight: bold;
`

const Text = styled.p`
  margin-top: 24px;
  font-size: 21px;
`

const TextSub = styled.p`
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
`

const TextBasic = styled.li`
  margin-top: 10px;
  font-size: 21px;
`

const Logo = styled.img`
  width: auto;
  height: auto;
  background-color: white;
  margin: 24px auto 0 auto;
  display: block;
  @media (max-width: 991px) {
    max-width: 300px;
  }
`

export default About;