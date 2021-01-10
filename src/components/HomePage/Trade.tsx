import React from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'
import {Button, Box} from '@aragon/ui';
import './style.css';
import {BalanceBlock, AddressBlock} from '../common/index';
import {UNISWAP_INFO, UNISWAP_SUPPLY, UNISWAP_TRADE, DEXTOOL} from "../../constants/contracts";

type TradeProps = {
  pairBalanceTSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
  theme: String,
};

const Trade = ({pairBalanceTSD, pairBalanceUSDC, uniswapPair, theme}: TradeProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);

  return (
    <>
      <div style={{ fontSize: 18, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{marginRight: '2%', fontSize: 48}}>
          <img src='./home/trade.png' />
        </div>
        <div style={{fontWeight: 'bold', fontSize: 30}}>
          Trade
        </div>
      </div>
      <Container className="box-trade">
        <Box>
          <BalanceBlock asset="TSD Price" balance={price} suffix={"USDC"}/>
          <Button
            label="Buy TSD"
            className="button-home"
            icon={<img src={`./home/tsd${theme}.png`}/>}
            onClick={() => window.open(UNISWAP_TRADE, "_blank")}
          />
        </Box>
        <Box>
          <BalanceBlock asset="TSD Liquidity" balance={pairBalanceTSD} suffix={"TSD"}/>
          <Button
            label="Info"
            className="button-home"
            icon={<img src={`./home/info${theme}.png`}/>}
            onClick={() => window.open(UNISWAP_INFO, "_blank")}
          />
        </Box>
        <Box>
          <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
          <Button
            className="button-home"
            label="Add Liquidity"
            icon={<img src={`./home/add-liquidity${theme}.png`}/>}
            onClick={() => window.open(UNISWAP_SUPPLY, "_blank")}
          />
        </Box>
        <Box>
          <AddressBlock label="Uniswap Contract" address={uniswapPair}/>
          <Button
            className="button-home"
            label="Chart"
            icon={<img src={`./home/chart${theme}.png`}/>}
            onClick={() => window.open(DEXTOOL, "_blank")}
            style={{
              marginTop: 4.58
            }}
          />
        </Box>
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
