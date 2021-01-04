import React from 'react';
import BigNumber from 'bignumber.js';
import {Box, Distribution} from '@aragon/ui';
import { useHistory } from 'react-router-dom';

import {formatMoney, ownership} from "../../utils/number";

type RegulationProps = {
  totalSupply: BigNumber,

  totalBonded: BigNumber,
  totalStaged: BigNumber,
  totalRedeemable: BigNumber,

  poolLiquidity: BigNumber,
  poolRewarded: BigNumber,
  poolClaimable: BigNumber,

};

const Regulation = ({
                      totalSupply,
                      totalBonded, totalStaged, totalRedeemable,
                      poolLiquidity, poolRewarded, poolClaimable
                    }: RegulationProps) => {
  const history = useHistory();
  const daoTotalSupply = totalBonded.plus(totalStaged).plus(totalRedeemable);
  const poolTotalSupply = poolLiquidity.plus(poolRewarded).plus(poolClaimable);
  const circulatingSupply = totalSupply.minus(daoTotalSupply).minus(poolTotalSupply);

  return (
    <>
      <div style={{paddingLeft: '3%', fontSize: 18, display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: '2%', fontSize: 48}}>
          <i className="fas fa-chart-area"/>
        </div>
        <div>
          Supply Regulation
        </div>
      </div>
      <div style={{paddingLeft: '3%', display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '25%', marginRight: '2%'}}>
          <Box heading="Supply Allocation">
            <Distribution
              heading={`${formatMoney(totalSupply.toNumber())}`}
              items={[
                {item: 'DAO', percentage: +(ownership(daoTotalSupply, totalSupply).toNumber().toFixed(2))},
                {item: 'Uniswap', percentage: +(ownership(poolTotalSupply, totalSupply).toNumber().toFixed(2))},
                {item: 'Circulating', percentage: +(ownership(circulatingSupply, totalSupply).toNumber().toFixed(2))},
              ]}
            />
          </Box>
        </div>
        <div style={{flexBasis: '25%', marginRight: '2%'}}>
          <Box heading="DAO Breakdown">
            <Distribution
              heading={`${formatMoney(daoTotalSupply.toNumber())}`}
              items={[
                {item: 'Bonded', percentage: +(ownership(totalBonded, daoTotalSupply).toNumber().toFixed(2))},
                {item: 'Staged', percentage: +(ownership(totalStaged, daoTotalSupply).toNumber().toFixed(2))},
                {item: 'Redeemable', percentage: +(ownership(totalRedeemable, daoTotalSupply).toNumber().toFixed(2))},
              ]}
            />
          </Box>
        </div>
        <div style={{flexBasis: '25%'}}>
          <Box heading="Uniswap Breakdown">
            <Distribution
              heading={`${formatMoney(poolTotalSupply.toNumber())}`}
              items={[
                {item: 'Liquidity', percentage: +(ownership(poolLiquidity, poolTotalSupply).toNumber().toFixed(2))},
                {item: 'Rewarded', percentage: +(ownership(poolRewarded, poolTotalSupply).toNumber().toFixed(2))},
                {item: 'Claimable', percentage: +(ownership(poolClaimable, poolTotalSupply).toNumber().toFixed(2))},
              ]}
            />
          </Box>
        </div>
      </div>
      <p
        style={{
          paddingLeft: '3%',
          paddingBottom: '3%',
          paddingTop: '1%',
          cursor: 'pointer'
        }}
        onClick={() => history.push('/regulation/')}>View more</p>
    </>
  );
}


export default Regulation;
