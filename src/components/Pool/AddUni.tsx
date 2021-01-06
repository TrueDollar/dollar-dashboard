import React, {useState} from 'react';
import {
  Box, Button, IconCirclePlus, IconArrowUp
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

import {
  BalanceBlock, MaxButton, PriceSection,
} from '../common/index';
import {approve, depositPool, providePool, withdrawPool} from '../../utils/web3';
import {buyUniV2} from '../../utils/infura';
import {isPos, toBaseUnitBN, toTokenUnitsBN} from '../../utils/number';
import {ZAP, USDC, TSD, UNI} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";

type AddUniProps = {
  user: string
  balanceUSDC: BigNumber,
  zapAllowance: BigNumber,
  accountUNIBalance: BigNumber
};

function AddUni({
                  user, balanceUSDC, zapAllowance, accountUNIBalance
                }: AddUniProps) {
  const [provideAmount, setProvideAmount] = useState(new BigNumber(0));

  const onChangeAmountTSD = (amountTSD) => {
    setProvideAmount(amountTSD);
  };

  return (
    <Box heading="Get UNI-V2 with your USDC">
      {zapAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0
        ? <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={"UNI-V2"}/>
          </div>
          <div style={{flexBasis: '33%'}}>
            <BalanceBlock asset="USDC Balance" balance={balanceUSDC} suffix={"USDC"}/>
          </div>
          <div style={{flexBasis: '2%'}}/>
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <BigNumberInput
                  adornment="USDC"
                  value={provideAmount}
                  setter={onChangeAmountTSD}
                />
                {/*<PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>*/}
                <MaxButton
                  onClick={() => {
                    onChangeAmountTSD(balanceUSDC);
                  }}
                  title="Max"
                />
              </div>
              <div style={{width: '40%', minWidth: '6em'}}>
                {
                  !isPos(provideAmount)
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
                          disabled={!isPos(provideAmount)}

                        />
                      </div>
                    </OverlayTrigger>
                    : <Button
                      wide
                      icon={<IconArrowUp/>}
                      label="Get UNI-V2"
                      onClick={() => buyUniV2(user, toBaseUnitBN(provideAmount, USDC.decimals))}
                    />
                }
              </div>
            </div>
          </div>
        </div>
        : <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={"UNI-V2"}/>
          </div>
          <div style={{flexBasis: '33%'}}>
            <BalanceBlock asset="USDC Balance" balance={balanceUSDC} suffix={"USDC"}/>
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Approve Pool to spend UNI-V2 */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <Button
              wide
              icon={<IconCirclePlus/>}
              label="Approve"
              onClick={() => {
                approve(USDC.addr, ZAP.addr);
              }}
              disabled={user === ''}
            />
          </div>
        </div>
      }
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}>Save some gas by Zapping your USDC directly to UNI-V2 of USDC-TSD pair with 1-click.</span>
      </div>
    </Box>
  );
}

export default AddUni;
