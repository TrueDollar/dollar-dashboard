import React from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import {Button} from '@aragon/ui';
import { useHistory } from 'react-router-dom';

import {BalanceBlock, AddressBlock} from '../common/index';
import {UNISWAP_INFO, UNISWAP_SUPPLY, UNISWAP_TRADE, DEXTOOL} from "../../constants/contracts";

type TradeProps = {
  pairBalanceTSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
};

const Trade = ({pairBalanceTSD, pairBalanceUSDC, uniswapPair}: TradeProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);
  const history = useHistory();

  return (
    <>
      <div style={{paddingLeft: '3%', fontSize: 18, display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: '2%', fontSize: 48}}>
          <i className="fas fa-exchange-alt"/>
        </div>
        <div>
          Trade
        </div>
      </div>
      <Container>
        <div>
          <BalanceBlock asset="TSD Price" balance={price} suffix={"USDC"}/>
          <Button
            label="Buy TSD"
            icon={<i className="fas fa-exchange-alt"/>}
            onClick={() => history.push('/buy/')}
          />
        </div>
        <div>
          <BalanceBlock asset="TSD Liquidity" balance={pairBalanceTSD} suffix={"TSD"}/>
          <Button
            label="Info"
            icon={<i className="fas fa-chart-area"/>}
            onClick={() => window.open(UNISWAP_INFO, "_blank")}
          />
        </div>
        <div>
          <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
          <Button
            label="Add Liquidity"
            icon={<i className="fas fa-water"/>}
            onClick={() => window.open(UNISWAP_SUPPLY, "_blank")}
          />
        </div>
        <div>
          <AddressBlock label="Uniswap Contract" address={uniswapPair}/>
          <Button
            label="Chart"
            icon={<i className="fas fa-chart-bar"/>}
            onClick={() => window.open(DEXTOOL, "_blank")}
            style={{
              marginTop: 4.58
            }}
          />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 3% 3%;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`

export default Trade;
