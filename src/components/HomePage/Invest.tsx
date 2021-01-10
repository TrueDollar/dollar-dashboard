import React from 'react';
import BigNumber from "bignumber.js";
import {Box, Button} from '@aragon/ui';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components'
import './style.css';
type InvestProps = {
  totalSupply: BigNumber,
  totalBonded: BigNumber,
  TSDLPBonded: BigNumber,
};

const Invest = ({totalSupply, totalBonded, TSDLPBonded}: InvestProps) => {
  const history = useHistory();
  const TSDLpBonded = TSDLPBonded.toNumber() * 2;
  const dao = (((((totalSupply.toNumber() * 4) / 100) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = ((((totalSupply.toNumber() * 4) / 100) * 40) / 100 + TSDLpBonded) / TSDLpBonded;
  const lpDaily = (((((totalSupply.toNumber() * 4) / 100) * 40) / 100) * 24 + TSDLpBonded) / TSDLpBonded;
  const lpWeekly = (((((totalSupply.toNumber() * 4) / 100) * 40) / 100) * 168 + TSDLpBonded) / TSDLpBonded;

  return (
    <>
      <div style={{ fontSize: 18, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{marginRight: '2%', fontSize: 48}}>
          <img src='./home/invest.png' />
        </div>
        <div style={{fontWeight: 'bold', fontSize: 30}}>
          Invest
        </div>
      </div>
      <Container className="box-invest">
        <div>
          <div>
            <div style={{fontWeight: 'bold', fontSize: 30}}>APR</div>
            <div className="invest" style={{fontSize: 16, padding: 3}}>
              <div>DAO hourly:</div>
              <div style={{
                flex: 1
              }}></div>
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
            <div className="invest" style={{fontSize: 16, padding: 3}}>DAO daily:
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
            <div className="invest" style={{fontSize: 16, padding: 3}}>DAO weekly:
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
          <Button
            className="mt-2 button-home"
            icon={<img src="./home/invest-1.png"/>}
            label="Invest in DAO"
            onClick={() => history.push('/dao/')}
          />
        </div>
        <div>
          <div>
            <div>
              <div style={{fontWeight: 'bold', fontSize: 30}}>APR</div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>LP hourly:
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((lpHourly - 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>LP daily:
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((lpDaily - 1) * 100).toFixed(2)}%
                </div>
              </div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>LP weekly:
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {((lpWeekly - 1) * 100).toFixed(2)}%
                </div>
              </div>
            </div>
            <Button
              className="mt-2 button-home"
              icon={<img src="./home/invest-1.png"/>}
              label="Invest in LP"
              onClick={() => history.push('/pool/')}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 3% 3%;
  justify-content: space-between;
  @media (max-width: 522px) {
    display: block;
  }
`
export default Invest;
