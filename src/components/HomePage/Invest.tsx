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
  theme: String,
  expRate: BigNumber,
  // totalDebt: BigNumber,
  // totalCoupons: BigNumber,
  // couponPremium: BigNumber,
};

const Invest = ({totalSupply, totalBonded, TSDLPBonded, theme, expRate}: InvestProps) => {
  const history = useHistory();
  const TSDLpBonded = TSDLPBonded.toNumber() * 2;
  const expRateCal = expRate.toNumber() <= 0 ? new BigNumber(0.04) : expRate;
  const dao = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 60) / 100 + totalBonded.toNumber()) / totalBonded.toNumber());
  const lpHourly = (((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100 + TSDLpBonded) / TSDLpBonded;
  const lpDaily = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100) * 24 + TSDLpBonded) / TSDLpBonded;
  const lpWeekly = ((((totalSupply.toNumber() * expRateCal.toNumber()) * 40) / 100) * 168 + TSDLpBonded) / TSDLpBonded;

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
        <Box>
          <div>
            <div style={{fontWeight: 'bold', fontSize: 30}}>{expRate.toNumber() > 0 ? 'APR' : 'APR (History)'}</div>
            <div className="invest" style={{fontSize: 16, padding: 3}}>
              <div>DAO hourly:</div>
              <div style ={{
                flex: 1,
                display: 'block',
                borderBottom: '1px dotted #888',
                height: '12px',
                margin: '0 10px'
              }} ></div>
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((dao - 1)*100).toFixed(2)}%</>
                    : <>0({((dao - 1)*100).toFixed(2)}%)</>
                }
              </div>
            </div>
            <div className="invest" style={{fontSize: 16, padding: 3}}>
              <div>DAO daily:</div>
              <div style ={{
                flex: 1,
                display: 'block',
                borderBottom: '1px dotted #888',
                height: '12px',
                margin: '0 10px'
              }} ></div>
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((dao - 1)*24*100).toFixed(2)}%</>
                    : <>0({((dao - 1)*24*100).toFixed(2)}%)</>
                }
              </div>
            </div>
            <div className="invest" style={{fontSize: 16, padding: 3}}>
              <div>DAO weekly:</div>
              <div style ={{
                flex: 1,
                display: 'block',
                borderBottom: '1px dotted #888',
                height: '12px',
                margin: '0 10px'
              }} ></div>
              <div style={{
                fontSize: 24,
                padding: 3,
                fontWeight: 400,
                lineHeight: 1.5,
                fontFamily: 'aragon-ui-monospace, monospace'
              }}>
                {
                  expRate.toNumber() > 0
                    ? <>{((dao - 1)*168*100).toFixed(2)}%</>
                    : <>0({((dao - 1)*168*100).toFixed(2)}%)</>
                }
              </div>
            </div>
          </div>
          <ContainerButton>
            <Button
              className="mt-2 button-home"
              icon={<img src={`./home/invest-1${theme}.png`}/>}
              label="Invest in DAO"
              onClick={() => history.push('/dao/')}
            />
          </ContainerButton>
        </Box>
        <Box>
          <div>
            <div>
              <div style={{fontWeight: 'bold', fontSize: 30}}>{expRate.toNumber() > 0 ? 'APR' : 'APR (History)'}</div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>
                <div>LP hourly:</div>
                <div style ={{
                  flex: 1,
                  display: 'block',
                  borderBottom: '1px dotted #888',
                  height: '12px',
                  margin: '0 10px'
                }} ></div>
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {
                    expRate.toNumber() > 0
                      ? <>{((lpHourly - 1)*100).toFixed(2)}%</>
                      : <>0({((lpHourly - 1)*100).toFixed(2)}%)</>
                  }
                </div>
              </div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>
                <div>LP daily:</div>
                <div style ={{
                  flex: 1,
                  display: 'block',
                  borderBottom: '1px dotted #888',
                  height: '12px',
                  margin: '0 10px'
                }} ></div>
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {
                    expRate.toNumber() > 0
                      ? <>{((lpDaily - 1)*100).toFixed(2)}%</>
                      : <>0({((lpDaily - 1)*100).toFixed(2)}%)</>
                  }
                </div>
              </div>
              <div className="invest" style={{fontSize: 16, padding: 3}}>
                <div>LP weekly:</div>
                <div style ={{
                  flex: 1,
                  display: 'block',
                  borderBottom: '1px dotted #888',
                  height: '12px',
                  margin: '0 10px'
                }} ></div>
                <div style={{
                  fontSize: 24,
                  padding: 3,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  fontFamily: 'aragon-ui-monospace, monospace'
                }}>
                  {
                    expRate.toNumber() > 0
                      ? <>{((lpWeekly - 1)*100).toFixed(2)}%</>
                      : <>0({((lpWeekly - 1)*100).toFixed(2)}%)</>
                  }
                </div>
              </div>
            </div>
            <ContainerButton>
              <Button
                className="mt-2 button-home"
                icon={<img src={`./home/invest-1${theme}.png`}/>}
                label="Invest in LP"
                onClick={() => history.push('/pool/')}
              />
            </ContainerButton>
          </div>
        </Box>
        {/*<Box>*/}
        {/*  <div>*/}
        {/*    <div>*/}
        {/*      <div style={{fontWeight: 'bold', fontSize: 30}}>Coupon</div>*/}
        {/*      <div className="invest" style={{fontSize: 16, padding: 3}}>*/}
        {/*        <div>LP hourly:</div>*/}
        {/*        <div style ={{*/}
        {/*          flex: 1,*/}
        {/*          display: 'block',*/}
        {/*          borderBottom: '1px dotted #888',*/}
        {/*          height: '12px',*/}
        {/*          margin: '0 10px'*/}
        {/*        }} ></div>*/}
        {/*        <div style={{*/}
        {/*          fontSize: 24,*/}
        {/*          padding: 3,*/}
        {/*          fontWeight: 400,*/}
        {/*          lineHeight: 1.5,*/}
        {/*          fontFamily: 'aragon-ui-monospace, monospace'*/}
        {/*        }}>*/}
        {/*          {*/}
        {/*            expRate.toNumber() > 0*/}
        {/*              ? <>{((lpHourly - 1)*100).toFixed(2)}%</>*/}
        {/*              : <>0({((lpHourly - 1)*100).toFixed(2)}%)</>*/}
        {/*          }*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="invest" style={{fontSize: 16, padding: 3}}>*/}
        {/*        <div>LP daily:</div>*/}
        {/*        <div style ={{*/}
        {/*          flex: 1,*/}
        {/*          display: 'block',*/}
        {/*          borderBottom: '1px dotted #888',*/}
        {/*          height: '12px',*/}
        {/*          margin: '0 10px'*/}
        {/*        }} ></div>*/}
        {/*        <div style={{*/}
        {/*          fontSize: 24,*/}
        {/*          padding: 3,*/}
        {/*          fontWeight: 400,*/}
        {/*          lineHeight: 1.5,*/}
        {/*          fontFamily: 'aragon-ui-monospace, monospace'*/}
        {/*        }}>*/}
        {/*          {*/}
        {/*            expRate.toNumber() > 0*/}
        {/*              ? <>{((lpDaily - 1)*100).toFixed(2)}%</>*/}
        {/*              : <>0({((lpDaily - 1)*100).toFixed(2)}%)</>*/}
        {/*          }*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*      <div className="invest" style={{fontSize: 16, padding: 3}}>*/}
        {/*        <div>LP weekly:</div>*/}
        {/*        <div style ={{*/}
        {/*          flex: 1,*/}
        {/*          display: 'block',*/}
        {/*          borderBottom: '1px dotted #888',*/}
        {/*          height: '12px',*/}
        {/*          margin: '0 10px'*/}
        {/*        }} ></div>*/}
        {/*        <div style={{*/}
        {/*          fontSize: 24,*/}
        {/*          padding: 3,*/}
        {/*          fontWeight: 400,*/}
        {/*          lineHeight: 1.5,*/}
        {/*          fontFamily: 'aragon-ui-monospace, monospace'*/}
        {/*        }}>*/}
        {/*          {*/}
        {/*            expRate.toNumber() > 0*/}
        {/*              ? <>{((lpWeekly - 1)*100).toFixed(2)}%</>*/}
        {/*              : <>0({((lpWeekly - 1)*100).toFixed(2)}%)</>*/}
        {/*          }*/}
        {/*        </div>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Box>*/}
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
const ContainerButton = styled.div`
  @media (max-width: 522px) {
    display: flex;
    justify-content: center;
  }
`

export default Invest;
