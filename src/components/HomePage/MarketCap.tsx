import React from 'react';
import BigNumber from "bignumber.js";

import {formatNumber} from '../../utils/number'

type MarketCapProps = {
  totalSupply: BigNumber,
  pairBalanceUSDC: BigNumber,
  pairBalanceTSD: BigNumber
};

const MarketCap = ({totalSupply, pairBalanceUSDC, pairBalanceTSD}: MarketCapProps) => {
  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);

  return (
    <div>
      <div style={{fontSize: 16, padding: 3}}>Market Cap</div>
      <div style={{
        fontSize: 24,
        padding: 3,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{formatNumber((totalSupply.multipliedBy(price)).toFixed(2))}$
      </div>
    </div>
  );
};

export default MarketCap;