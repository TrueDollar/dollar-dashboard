import React, { useState } from 'react';
import {
  Box, Button, IconArrowUp, IconCirclePlus
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import {BalanceBlock, MaxButton, PriceSection} from '../common/index';
import {approve, claimPool, providePool} from '../../utils/web3';
import {isPos, toBaseUnitBN, toTokenUnitsBN} from '../../utils/number';
import {TSD, USDC} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import BigNumberInput from "../common/BigNumberInput";
import {OverlayTrigger, Tooltip} from "react-bootstrap";

type ProvideProps = {
  poolAddress: string,
  user: string,
  rewarded: BigNumber,
  pairBalanceTSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  userUSDCBalance: BigNumber,
  userUSDCAllowance: BigNumber,
  status: number,
};

function Provide({
  poolAddress, user, rewarded, pairBalanceTSD, pairBalanceUSDC, userUSDCBalance, userUSDCAllowance, status
}: ProvideProps) {
  const [provideAmount, setProvideAmount] = useState(new BigNumber(0));
  const [usdcAmount, setUsdcAmount] = useState(new BigNumber(0));

  const USDCToTSDRatio = pairBalanceUSDC.isZero() ? new BigNumber(1) : pairBalanceUSDC.div(pairBalanceTSD);

  const onChangeAmountTSD = (amountTSD) => {
    if (!amountTSD) {
      setProvideAmount(new BigNumber(0));
      setUsdcAmount(new BigNumber(0));
      return;
    }

    const amountTSDBN = new BigNumber(amountTSD)
    setProvideAmount(amountTSDBN);

    const amountTSDBU = toBaseUnitBN(amountTSDBN, TSD.decimals);
    const newAmountUSDC = toTokenUnitsBN(amountTSDBU.multipliedBy(USDCToTSDRatio).integerValue(BigNumber.ROUND_FLOOR), TSD.decimals);
    setUsdcAmount(newAmountUSDC);
  };

  const handleMaxUSDC = () => {
    const newAmountTSD = userUSDCBalance.dividedBy(USDCToTSDRatio);
    onChangeAmountTSD(newAmountTSD)
  }

  return (
    <Box heading="Provide">
      {userUSDCAllowance.comparedTo(MAX_UINT256.dividedBy(2)) > 0 ?
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total rewarded */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Rewarded" balance={rewarded} suffix={"TSD"} />
          </div>
          <div style={{flexBasis: '33%'}}>
            <BalanceBlock asset="USDC Balance" balance={userUSDCBalance} suffix={"USDC"} />
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Provide liquidity using Pool rewards */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <div style={{display: 'flex'}}>
              <div style={{width: '60%', minWidth: '6em'}}>
                <>
                  <BigNumberInput
                    adornment="TSD"
                    value={provideAmount}
                    setter={onChangeAmountTSD}
                    disabled={status === 1}
                  />
                  <PriceSection label="Requires " amt={usdcAmount} symbol=" USDC"/>
                  <div className="d-flex">
                    <MaxButton
                      onClick={() => {
                        onChangeAmountTSD(rewarded);
                      }}
                      title="Max TSD"
                    />
                    <div className="ml-4">
                      <MaxButton
                        onClick={handleMaxUSDC}
                        title="Max USDC"
                      />
                    </div>
                  </div>
                </>
              </div>
              <div style={{width: '40%', minWidth: '6em'}}>
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip id="tooltip">
                      Make sure the value &gt; 0 and your status is Unlocked.
                    </Tooltip>
                  }
                >
                  <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                    <Button
                      style={{ pointerEvents: 'none' }}
                      wide
                      icon={<IconArrowUp/>}
                      label="Provide"
                      onClick={() => {
                        providePool(
                          poolAddress,
                          toBaseUnitBN(provideAmount, TSD.decimals),
                          (hash) => setProvideAmount(new BigNumber(0))
                        );
                      }}
                      disabled={poolAddress === '' || status !== 0 || !isPos(provideAmount) || usdcAmount.isGreaterThan(userUSDCBalance)}
                    />
                  </div>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
        :
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          {/* total rewarded */}
          <div style={{flexBasis: '32%'}}>
            <BalanceBlock asset="Rewarded" balance={rewarded} suffix={"TSD"} />
          </div>
          <div style={{flexBasis: '33%'}}>
            <BalanceBlock asset="USDC Balance" balance={userUSDCBalance} suffix={"USDC"} />
          </div>
          <div style={{flexBasis: '2%'}}/>
          {/* Approve Pool to spend USDC */}
          <div style={{flexBasis: '33%', paddingTop: '2%'}}>
            <Button
              wide
              icon={<IconCirclePlus/>}
              label="Approve"
              onClick={() => {
                approve(USDC.addr, poolAddress);
              }}
              disabled={poolAddress === '' || user === ''}
            />
          </div>
        </div>
      }
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{ opacity: 0.5 }}> Zapping requires your Bonded balance &gt; 0 and your status as Unlocked. </span>
      </div>
    </Box>
  );
}

export default Provide;
