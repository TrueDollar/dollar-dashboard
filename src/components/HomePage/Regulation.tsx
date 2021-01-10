import React from 'react';
import BigNumber from 'bignumber.js';
import {Distribution} from '@aragon/ui';
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
        <div style={{ fontSize: 18, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{marginRight: '2%', fontSize: 48}}>
                <img src='./home/supply-regulation.png' />
            </div>
            <div style={{fontWeight: 'bold', fontSize: 30}}>
                Supply Regulation
            </div>
        </div>
        <Container className="box-regulation">
        <div>
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
        </div>
        <div>
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
        </div>
        <div>
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
        </div>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="27.291" height="17.923" viewBox="0 0 27.291 17.923">
              <path id="Path_2991" data-name="Path 2991" d="M255.99,476.066l.016.016a.652.652,0,0,0,.085.062c.008.008.015.008.023.015.031.016.062.039.093.054a.028.028,0,0,1,.016.008,1.06,1.06,0,0,0,.1.047c.008,0,.008,0,.016.007.031.016.069.024.108.039.008,0,.015,0,.015.008a.6.6,0,0,0,.109.023.07.07,0,0,1,.039.008c.03.008.061.008.092.015a.737.737,0,0,0,.132.008.721.721,0,0,0,.131-.008.376.376,0,0,0,.093-.015.069.069,0,0,0,.039-.008c.038-.008.069-.016.108-.023.008,0,.015,0,.015-.008a.6.6,0,0,0,.109-.039c.008,0,.008,0,.015-.007.031-.016.07-.031.1-.047a.024.024,0,0,0,.015-.008.5.5,0,0,0,.093-.054c.008-.007.016-.007.024-.015a1.041,1.041,0,0,0,.085-.062l.015-.016a1.2,1.2,0,0,0,.1-.092l7.645-7.653a1.33,1.33,0,0,0-1.88-1.881l-5.386,5.386V450.415a1.327,1.327,0,1,0-2.654,0v21.419l-5.347-5.347a1.327,1.327,0,1,0-1.88,1.872l7.606,7.607c.046.039.077.069.108.1Zm0,0" transform="translate(-449.085 265.812) rotate(-90)"/>
          </svg>

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
