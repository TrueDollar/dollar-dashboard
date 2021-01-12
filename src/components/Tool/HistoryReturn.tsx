import React from 'react';
import styled from 'styled-components'
import BigNumber from "bignumber.js";

type HistoryReturnProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
  TSDLPBonded: BigNumber,
  expRate: BigNumber,
};

const HistoryReturn = ({totalSupply, totalBonded, TSDLPBonded, expRate}: HistoryReturnProps) => {
  const TSDLpBonded = TSDLPBonded.toNumber() * 2;
  const expRateCal = expRate.toNumber() <= 0 ? new BigNumber(0.04) : expRate;
  const dao = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = (((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100 + TSDLpBonded) / TSDLpBonded;
  const lpDaily = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100) * 24 + TSDLpBonded) / TSDLpBonded;

  return (
    <div>
      <Title>{expRate.toNumber() > 0 ? 'Yield' : 'Yield (History)'}</Title>
      <Container>
        <ContainerItem>
          <ContainerFlex>
            <p>DAO hourly:</p>
            <Value>
              {
                expRate.toNumber() > 0
                  ? <>{((dao - 1) * 100).toFixed(2)}%</>
                  : <>0({((dao - 1) * 100).toFixed(2)}%)</>
              }
            </Value>
          </ContainerFlex>
          <ContainerFlex>
            <p>DAO daily:</p>
            <Value>
              {
                expRate.toNumber() > 0
                  ? <>{((dao - 1) * 24 * 100).toFixed(2)}%</>
                  : <>0({((dao - 1) * 24 * 100).toFixed(2)}%)</>
              }
            </Value>
          </ContainerFlex>
        </ContainerItem>
        <ContainerItem>
          <ContainerFlex>
            <p>LP hourly:</p>
            <Value>
              {
                expRate.toNumber() > 0
                  ? <>{((lpHourly - 1) * 100).toFixed(2)}%</>
                  : <>0({((lpHourly - 1) * 100).toFixed(2)}%)</>
              }
            </Value>
          </ContainerFlex>
          <ContainerFlex>
            <p>LP daily:</p>
            <Value>
              {
                expRate.toNumber() > 0
                  ? <>{((lpDaily - 1) * 100).toFixed(2)}%</>
                  : <>0({((lpDaily - 1) * 100).toFixed(2)}%)</>
              }
            </Value>
          </ContainerFlex>
        </ContainerItem>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 522px) {
    display: block;
    padding: 10px;
  }
`

const ContainerItem = styled.div`
  flex-basis: 50%;
  padding: 10px 50px 30px 50px;
  @media (max-width: 522px) {
    padding: 0;
  }
`

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const Title = styled.h2`
  margin-top: 20px;
  margin-left: 50px;
  @media (max-width: 522px) {
    margin-top: 20px;
    margin-left: 10px;
  }
`

const Value = styled.h2`
  font-size: 19px;
`

export default HistoryReturn;