import React from 'react';
import BigNumber from "bignumber.js";
import {formatNumber} from "../../utils/number";

type TotalSupplyProps = {
  totalSupply: BigNumber,
  totalCoupons: BigNumber,
};

const TotalSupply = ({totalSupply, totalCoupons}:TotalSupplyProps) => {
  return (
    <div>
      <div style={{fontSize: 16, padding: 3}}>Total Supply</div>
      <div style={{
        fontSize: 24,
        padding: 3,
        fontWeight: 400,
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{formatNumber((totalSupply.toNumber() - totalCoupons.toNumber()).toFixed(2))}
      </div>
      <div style={{fontSize: 16, padding: 3}}>Status: <strong>EXPANSION (+{((totalSupply.toNumber()*4)/100).toFixed()} next epoch)</strong></div>
    </div>
  );
};

export default TotalSupply;