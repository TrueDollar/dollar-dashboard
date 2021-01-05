import React from 'react';
import BigNumber from "bignumber.js";
import {Box} from '@aragon/ui';

type InvestProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
};

const Invest = ({totalSupply, totalBonded}: InvestProps) => {
  const dao = (((((totalSupply.toNumber() * 4) / 100) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());

  return (
    <div style={{padding: '1%', display: 'flex', flexWrap: 'wrap'}}>
      <div style={{flexBasis: '30%', flexGrow: 1, marginRight: '2%'}}>
        <Box>
          <div>
            <div style={{fontSize: 16, padding: 3}}>APR</div>
            <div style={{fontSize: 16, padding: 3}}>DAO hourly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 100).toFixed(2)}%
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>DAO daily:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 24 * 100).toFixed(2)}%
              </div>
            </div>
            <div style={{fontSize: 16, padding: 3}}>DAO weekly:
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {((dao - 1) * 168 * 100).toFixed(2)}%
              </div>
            </div>
          </div>
        </Box>
      </div>
      <div style={{flexBasis: '68%'}}>
        <Box className="h-100">
          <h1 style={{fontSize: 30}}><strong>Guide for DAO bonding</strong></h1>

          <p className="mt-4">Step 1: You need to have TSD in your wallet.</p>

          <p className="mt-2">Step 2: Approve your TSD to unlock Staging (skip it if you've done it)</p>

          <p className="mt-2">Step 3: Stage your TSD into DAO</p>

          <p className="mt-2">Step 4: Bond your TSD into DAO</p>

          <p className="mt-2">Step 5: Unbond and wait 72 hours to claim your rewards</p>
        </Box>
      </div>
    </div>
  );
};

export default Invest;