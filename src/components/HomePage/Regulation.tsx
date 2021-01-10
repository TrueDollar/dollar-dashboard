import React from 'react';
import BigNumber from 'bignumber.js';
import {Box, Distribution} from '@aragon/ui';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components'
import './style.css';
import {formatMoney, ownership} from "../../utils/number";

type RegulationProps = {
  totalSupply: BigNumber,

  totalBonded: BigNumber,
  totalStaged: BigNumber,
  totalRedeemable: BigNumber,

  poolLiquidity: BigNumber,
  poolRewarded: BigNumber,
  poolClaimable: BigNumber,
    theme: String
};

const Regulation = ({
                      totalSupply,
                      totalBonded, totalStaged, totalRedeemable,
                      poolLiquidity, poolRewarded, poolClaimable, theme
                    }: RegulationProps) => {
  const history = useHistory();
  const daoTotalSupply = totalBonded.plus(totalStaged).plus(totalRedeemable);
  const poolTotalSupply = poolLiquidity.plus(poolRewarded).plus(poolClaimable);
  const circulatingSupply = totalSupply.minus(daoTotalSupply).minus(poolTotalSupply);

  return (
    <>
        <div style={{ fontSize: 18, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginRight: '2%', fontSize: 48}}>
                <img src='./home/supply-regulation.png' />
            </div>
            <div style={{fontWeight: 'bold', fontSize: 30}}>
                Supply Regulation
            </div>
        </div>
        <Container className="box-regulation">
        <Box>
            <div style={{
                fontSize: 25,
                textAlign: 'center',
                borderBottom: '1px solid #707070',
                paddingBottom: 20,
                marginBottom: 40,
            }}>Supply Allocation</div>
          <div>
            <Distribution
              heading={`${formatMoney(totalSupply.toNumber())}`}
              items={[
                {item: 'DAO', percentage: +(ownership(daoTotalSupply, totalSupply).toNumber().toFixed(2))},
                {item: 'Uniswap', percentage: +(ownership(poolTotalSupply, totalSupply).toNumber().toFixed(2))},
                {item: 'Circulating', percentage: +(ownership(circulatingSupply, totalSupply).toNumber().toFixed(2))},
              ]}
            />
          </div>
        </Box>
        <Box>
          <div style={{
              fontSize: 25,
              textAlign: 'center',
              borderBottom: '1px solid #707070',
              paddingBottom: 20,
              marginBottom: 40,
          }}>DAO Breakdown</div>
            <div>
                <Distribution
                  heading={`${formatMoney(daoTotalSupply.toNumber())}`}
                  items={[
                    {item: 'Bonded', percentage: +(ownership(totalBonded, daoTotalSupply).toNumber().toFixed(2))},
                    {item: 'Staged', percentage: +(ownership(totalStaged, daoTotalSupply).toNumber().toFixed(2))},
                    {item: 'Redeemable', percentage: +(ownership(totalRedeemable, daoTotalSupply).toNumber().toFixed(2))},
                  ]}
                />
            </div>
        </Box>
        <Box>
          <div style={{
              fontSize: 25,
              textAlign: 'center',
              borderBottom: '1px solid #707070',
              paddingBottom: 20,
              marginBottom: 40,
          }}>Uniswap Breakdown</div>
            <div>
                <Distribution
                  heading={`${formatMoney(poolTotalSupply.toNumber())}`}
                  items={[
                    {item: 'Liquidity', percentage: +(ownership(poolLiquidity, poolTotalSupply).toNumber().toFixed(2))},
                    {item: 'Rewarded', percentage: +(ownership(poolRewarded, poolTotalSupply).toNumber().toFixed(2))},
                    {item: 'Claimable', percentage: +(ownership(poolClaimable, poolTotalSupply).toNumber().toFixed(2))},
                  ]}
                />
            </div>
        </Box>
      </Container>
        <div style={{
            textAlign: 'center'
        }}>
      <p
        style={{
          paddingLeft: '3%',
          paddingBottom: '3%',
          paddingTop: '1%',
          cursor: 'pointer'
        }}
        onClick={() => history.push('/regulation/')}> <span style={{marginRight: 10, fontWeight: 'bold', fontSize: 20}}>View more</span>
          <img
              src={`./home/more${theme}.png`} />
      </p>
        </div>
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
export default Regulation;
