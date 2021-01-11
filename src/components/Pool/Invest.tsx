import React from 'react';
import BigNumber from "bignumber.js";
import {Box} from '@aragon/ui';
import styled from 'styled-components'

type InvestProps = {
  totalSupply: BigNumber,
  TSDLPBonded: BigNumber,
  expRate: BigNumber
};

const Invest = ({totalSupply, TSDLPBonded, expRate}: InvestProps) => {
  const TSDLpBonded = TSDLPBonded.toNumber() * 2;
  const expRateCal = expRate.toNumber() <= 0 ? new BigNumber(0.04) : expRate;
  const lpHourly = (((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100 + TSDLpBonded) / TSDLpBonded;
  const lpDaily = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100) * 24 + TSDLpBonded) / TSDLpBonded;
  const lpWeekly = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100) * 168 + TSDLpBonded) / TSDLpBonded;

  return (
    <Container>
      <ContainerItem style={{flexBasis: '30%', flexGrow: 1, marginRight: '2%'}}>
        <Box>
          <div>
            <div style={{fontSize: 16, padding: 3}}>{expRate.toNumber() > 0 ? 'APR' : 'APR (History)'}</div>
            <div style={{fontSize: 16, padding: 3}}>LP hourly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((lpHourly - 1)*100).toFixed(2)}%</>
                    : <>0%({((lpHourly - 1)*100).toFixed(2)}%)</>
                }
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>LP daily:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((lpDaily - 1)*100).toFixed(2)}%</>
                    : <>0%({((lpDaily - 1)*100).toFixed(2)}%)</>
                }
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>LP weekly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((lpWeekly - 1)*100).toFixed(2)}%</>
                    : <>0%({((lpWeekly - 1)*100).toFixed(2)}%)</>
                }
              </div>
            </div>
          </div>
        </Box>
      </ContainerItem>
      <ContainerItem style={{flexBasis: '68%'}}>
        <Box className="h-100">
          <h1 style={{fontSize: 30}}><strong>Guide for LP bonding</strong></h1>

          <p className="mt-4">Step 1: You need to have UNI-V2 in your wallet (by adding Liquidity to USDC-TSD pair).</p>

          <p className="mt-2">Step 2: Approve your UNI-V2 to unlock Staging (skip it if you've done it)</p>

          <p className="mt-2">Step 3: Stage your UNI-V2 into LP</p>

          <p className="mt-2">Step 4: Bond your UNI-V2 into LP</p>

          <p className="mt-2">Step 5: Unbond and wait 24 hours to claim your rewards</p>
        </Box>
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
  @media (max-width: 568px) {
    display: block;
  }
`

const ContainerItem = styled.div`
  @media (max-width: 568px) {
    margin: 2% !important;
  }
`

export default Invest;