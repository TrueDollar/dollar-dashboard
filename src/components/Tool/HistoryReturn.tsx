import React from 'react';
import styled from 'styled-components'
import BigNumber from "bignumber.js";

type HistoryReturnProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
  TSDLPBonded: BigNumber,
  expRate: BigNumber,
};

const HistoryReturn = ({totalSupply, totalBonded, TSDLPBonded,expRate}: HistoryReturnProps) => {
  const TSDLpBonded = TSDLPBonded.toNumber()*2;
  const expRateCal = expRate.toNumber() <= 0 ? new BigNumber(0.04) : expRate;
  const dao = ((((totalSupply.toNumber()*expRateCal.toNumber())*60)/100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = (((totalSupply.toNumber()*expRateCal.toNumber())*40)/100 + TSDLpBonded) / TSDLpBonded;
  const lpDaily = ((((totalSupply.toNumber()*expRateCal.toNumber())*40)/100)*24 + TSDLpBonded) / TSDLpBonded;

  return (
    <div className="mt-4">
      <Title>{expRate.toNumber() > 0 ? 'Yield' : 'Yield (History)'}</Title>
      <Container>
        <div style={{flexBasis: '48%', maxWidth: 300}}>
          <ContainerItem>
            <div>
              <p>DAO hourly:</p>
              <p>DAO daily:</p>
            </div>
            <div className="text-right">
              <p>
                {
                  expRate.toNumber() > 0
                  ? <>{((dao - 1)*100).toFixed(2)}%</>
                    : <>0({((dao - 1)*100).toFixed(2)}%)</>
                }
                </p>
              <p>
                {
                  expRate.toNumber() > 0
                    ? <>{((dao - 1)*24*100).toFixed(2)}%</>
                    : <>0({((dao - 1)*24*100).toFixed(2)}%)</>
                }
              </p>
            </div>
          </ContainerItem>
        </div>
        <div style={{flexBasis: '48%', maxWidth: 300}}>
          <ContainerItem>
            <div>
              <p>LP hourly:</p>
              <p>LP daily:</p>
            </div>
            <div className="text-right">
              <p>
                {
                  expRate.toNumber() > 0
                    ? <>{((lpHourly - 1)*100).toFixed(2)}%</>
                    : <>0({((lpHourly - 1)*100).toFixed(2)}%)</>
                }
                </p>
              <p>
                {
                  expRate.toNumber() > 0
                    ? <>{((lpDaily - 1)*100).toFixed(2)}%</>
                    : <>0({((lpDaily - 1)*100).toFixed(2)}%)</>
                }
              </p>
            </div>
          </ContainerItem>
        </div>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h2`
  font-weight: bold;
`

export default HistoryReturn;