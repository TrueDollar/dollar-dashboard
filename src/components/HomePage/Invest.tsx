import React from 'react';
import BigNumber from "bignumber.js";
import {Box, Button} from '@aragon/ui';
import {useHistory} from 'react-router-dom';

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
      <div style={{paddingLeft: '3%', fontSize: 18, display: 'flex', alignItems: 'center'}}>
        <div style={{marginRight: '2%', fontSize: 48}}>
          <i className="fas fa-chart-line"/>
        </div>
        <div>
          Invest
        </div>
      </div>
      <div style={{padding: '1%', paddingTop: '2%', paddingBottom: '3%', display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '30%', marginRight: '3%', marginLeft: '2%'}}>
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
          <Button
            className="mt-2"
            label="Invest in DAO"
            onClick={() => history.push('/dao/')}
          />
        </div>
        <div style={{flexBasis: '30%'}}>
          <div style={{flexBasis: '30%', marginLeft: '2%'}}>
            <Box>
              <div>
                <div style={{fontSize: 16, padding: 3}}>APR</div>
                <div style={{fontSize: 16, padding: 3}}>LP hourly:
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
                <div style={{fontSize: 16, padding: 3}}>LP daily:
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
                <div style={{fontSize: 16, padding: 3}}>LP weekly:
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
            </Box>
            <Button
              className="mt-2"
              label="Invest in LP"
              onClick={() => history.push('/pool/')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Invest;