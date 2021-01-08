import React, {useState} from 'react';
import {
  Box, Button, IconCirclePlus, IconArrowUp
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {OverlayTrigger, Tooltip} from "react-bootstrap";
import styled from 'styled-components'

import { BalanceBlock, MaxButton } from '../common/index';
import {approve, approveTSD, approveESD, approvePairDSD, approveDSD, approveZAI} from '../../utils/web3';
import {buyUniV2, buyUniV2FromProxy, migrateUniV2} from '../../utils/infura';
import {isPos, toBaseUnitBN} from '../../utils/number';
import {ZAP, USDC, TSD, ESD, DSD, UNI_DSD_USDC, ZAI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";

type AddUniProps = {
  user: string
  balanceUSDC: BigNumber,
  zapTSDAllowance: BigNumber,
  zapUSDCAllowance: BigNumber,
  zapESDAllowance: BigNumber,
  zapDSDAllowance: BigNumber,
  zapZAIAllowance: BigNumber,
  accountUNIBalance: BigNumber,
  balanceTSD: BigNumber,
  balanceESD: BigNumber,
  balanceDSD: BigNumber,
  balanceZAI: BigNumber,
};

function AddUni({
                  user, balanceUSDC, zapTSDAllowance, accountUNIBalance, balanceTSD, zapUSDCAllowance, zapESDAllowance, balanceESD,zapDSDAllowance, balanceDSD, balanceZAI, zapZAIAllowance
                }: AddUniProps) {
  const [amountTSD, setAmountTSD] = useState(new BigNumber(0));
  const [amountUSDC, setAmountUSDC] = useState(new BigNumber(0));
  const [amountESD, setAmountESD] = useState(new BigNumber(0));
  const [amountDSD, setAmountDSD] = useState(new BigNumber(0));
  const [amountZAI, setAmountZAI] = useState(new BigNumber(0));

  const onChangeAmountTSD = (amount) => {
    setAmountTSD(amount);
  };

  const onChangeAmountUSDC = (amount) => {
    setAmountUSDC(amount);
  };

  const onChangeAmountESD = (amount) => {
    setAmountESD(amount);
  };

  const onChangeAmountDSD = (amount) => {
    setAmountDSD(amount);
  };

  const onChangeAmountZAI = (amount) => {
    setAmountZAI(amount);
  };

  return (
    <Box heading="Invest in LP Pool of TSD with your USDC/TSD/ESD/DSD/ZAI">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '32%'}}>
          <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={"UNI-V2"}/>
        </div>
        <Container>
          <div>
            <BalanceBlock asset="USDC Balance" balance={balanceUSDC} suffix={"USDC"}/>
            <BalanceBlock asset="TSD Balance" balance={balanceTSD} suffix={"TSD"}/>
            <BalanceBlock asset="ESD Balance" balance={balanceESD} suffix={"ESD"}/>
            <BalanceBlock asset="DSD Balance" balance={balanceDSD} suffix={"DSD"}/>
            <BalanceBlock asset="ZAI Balance" balance={balanceZAI} suffix={"ZAI"}/>
          </div>
          <div className="d-flex flex-column justify-content-between">
            {
              zapUSDCAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="USDC"
                      value={amountUSDC}
                      setter={onChangeAmountUSDC}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountUSDC(balanceUSDC);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      (!isPos(amountUSDC) || amountUSDC.isGreaterThan(balanceUSDC))
                        ? <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              Make sure the value &gt; 0
                            </Tooltip>
                          }
                        >
                          <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                            <Button
                              style={{pointerEvents: 'none'}}
                              wide
                              icon={<IconArrowUp/>}
                              label="Get UNI-V2"
                              disabled
                            />
                          </div>
                        </OverlayTrigger>
                        : <Button
                          wide
                          icon={<IconArrowUp/>}
                          label="Get UNI-V2"
                          onClick={() => buyUniV2(user, toBaseUnitBN(amountUSDC, USDC.decimals), USDC.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve USDC"
                  onClick={() => {
                    approve(USDC.addr, ZAP.addr);
                  }}
                  disabled={user === ''}
                />
            }
            {
              zapTSDAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="TSD"
                      value={amountTSD}
                      setter={onChangeAmountTSD}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountTSD(balanceTSD);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      ( !isPos(amountTSD) || amountTSD.isGreaterThan(balanceTSD))
                        ? <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              Make sure the value &gt; 0
                            </Tooltip>
                          }
                        >
                          <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                            <Button
                              style={{pointerEvents: 'none'}}
                              wide
                              icon={<IconArrowUp/>}
                              label="Get UNI-V2"
                              disabled
                            />
                          </div>
                        </OverlayTrigger>
                        : <Button
                          wide
                          icon={<IconArrowUp/>}
                          label="Get UNI-V2"
                          onClick={() => buyUniV2(user, toBaseUnitBN(amountTSD, TSD.decimals), TSD.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  className="mt-2"
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve TSD"
                  onClick={() => {
                    approveTSD(TSD.addr, ZAP.addr);
                  }}
                  disabled={user === ''}
                />
            }
            {
              zapESDAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="ESD"
                      value={amountESD}
                      setter={onChangeAmountESD}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountESD(balanceESD);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      ( !isPos(amountESD) || amountESD.isGreaterThan(balanceESD))
                        ? <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              Make sure the value &gt; 0
                            </Tooltip>
                          }
                        >
                          <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                            <Button
                              style={{pointerEvents: 'none'}}
                              wide
                              icon={<IconArrowUp/>}
                              label="Get UNI-V2"
                              disabled
                            />
                          </div>
                        </OverlayTrigger>
                        : <Button
                          wide
                          icon={<IconArrowUp/>}
                          label="Get UNI-V2"
                          onClick={() => buyUniV2FromProxy(user, toBaseUnitBN(amountESD, ESD.decimals), ESD.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  className="mt-2"
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve ESD"
                  onClick={() => {
                    approveESD(ESD.addr, ZAP.addr);
                  }}
                  disabled={user === ''}
                />
            }
            {
              zapDSDAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="DSD"
                      value={amountDSD}
                      setter={onChangeAmountDSD}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountDSD(balanceDSD);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      ( !isPos(amountDSD) || amountDSD.isGreaterThan(balanceDSD))
                        ? <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              Make sure the value &gt; 0
                            </Tooltip>
                          }
                        >
                          <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                            <Button
                              style={{pointerEvents: 'none'}}
                              wide
                              icon={<IconArrowUp/>}
                              label="Get UNI-V2"
                              disabled
                            />
                          </div>
                        </OverlayTrigger>
                        : <Button
                          wide
                          icon={<IconArrowUp/>}
                          label="Get UNI-V2"
                          onClick={() => buyUniV2FromProxy(user, toBaseUnitBN(amountDSD, DSD.decimals), DSD.addr)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  className="mt-2"
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve DSD"
                  onClick={() => {
                    approveDSD(DSD.addr, ZAP.addr);
                  }}
                  disabled={user === ''}
                />
            }
            {
              zapZAIAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
                ? <div style={{display: 'flex'}}>
                  <div style={{width: '60%', minWidth: '6em'}}>
                    <BigNumberInput
                      adornment="ZAI"
                      value={amountZAI}
                      setter={onChangeAmountZAI}
                    />
                    {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                    <MaxButton
                      onClick={() => {
                        onChangeAmountZAI(balanceZAI);
                      }}
                      title="Max"
                    />
                  </div>
                  <div style={{width: '40%', minWidth: '6em'}}>
                    {
                      ( !isPos(amountZAI) || amountDSD.isGreaterThan(balanceZAI))
                        ? <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip id="tooltip">
                              Make sure the value &gt; 0
                            </Tooltip>
                          }
                        >
                          <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                            <Button
                              style={{pointerEvents: 'none'}}
                              wide
                              icon={<IconArrowUp/>}
                              label="Get UNI-V2"
                              disabled
                            />
                          </div>
                        </OverlayTrigger>
                        : <Button
                          wide
                          icon={<IconArrowUp/>}
                          label="Get UNI-V2"
                          onClick={() => buyUniV2FromProxy(user, toBaseUnitBN(amountZAI, ZAI.decimals), ZAI.addr, true)}
                        />
                    }
                  </div>
                </div>
                : <Button
                  className="mt-2"
                  wide
                  icon={<IconCirclePlus/>}
                  label="Approve ZAI"
                  onClick={() => {
                    approveZAI(ZAI.addr, ZAP.addr);
                  }}
                  disabled={user === ''}
                />
            }
          </div>

        </Container>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}>Save some gas by Zapping USDC/TSD/ESD/DSD/ZAI and invest to UNI-V2 of TSD pair with 1-click.</span>
      </div>
    </Box>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  @media (max-width: 568px) {
    flex: none;
  }
`

export default AddUni;
