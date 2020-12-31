import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock, AddressBlock } from '../common/index';

type TradePageHeaderProps = {
  pairBalanceTSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  uniswapPair: string,
};

const TradePageHeader = ({
  pairBalanceTSD, pairBalanceUSDC, uniswapPair,
}: TradePageHeaderProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);

  return (
    <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="TSD Price" balance={price} suffix={"USDC"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="TSD Liquidity" balance={pairBalanceTSD} suffix={"TSD"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <BalanceBlock asset="USDC Liquidity" balance={pairBalanceUSDC} suffix={"USDC"}/>
      </div>
      <div style={{ flexBasis: '25%' }}>
        <>
          <AddressBlock label="Uniswap Contract" address={uniswapPair} />
        </>
      </div>
    </div>
  );
}


export default TradePageHeader;
