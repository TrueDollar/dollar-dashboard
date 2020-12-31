import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import { Box, Button, IconCirclePlus } from '@aragon/ui';
import { addLiquidity } from '../../utils/web3';

import { BalanceBlock, MaxButton, PriceSection } from '../common/index';
import {toBaseUnitBN, toTokenUnitsBN} from '../../utils/number';
import {TSD, UNI, USDC} from "../../constants/tokens";
import {SLIPPAGE} from "../../utils/calculation";
import BigNumberInput from "../common/BigNumberInput";

type AddliquidityProps = {
  userBalanceTSD: BigNumber,
  userBalanceUSDC: BigNumber,
  pairBalanceTSD: BigNumber,
  pairBalanceUSDC: BigNumber,
  pairTotalSupplyUNI: BigNumber,
}

function AddLiquidity({
  userBalanceTSD,
  userBalanceUSDC,
  pairBalanceTSD,
  pairBalanceUSDC,
  pairTotalSupplyUNI,
}: AddliquidityProps) {
  const [amountUSDC, setAmountUSDC] = useState(new BigNumber(0));
  const [amountTSD, setAmountTSD] = useState(new BigNumber(0));
  const [amountUNI, setAmountUNI] = useState(new BigNumber(0));

  const USDCToTSDRatio = pairBalanceUSDC.isZero() ? new BigNumber(1) : pairBalanceUSDC.div(pairBalanceTSD);
  const TSDToUSDCRatio = pairBalanceTSD.isZero() ? new BigNumber(1) : pairBalanceTSD.div(pairBalanceUSDC);

  const onChangeAmountUSDC = (amountUSDC) => {
    if (!amountUSDC) {
      setAmountTSD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountUSDCBN = new BigNumber(amountUSDC)
    setAmountUSDC(amountUSDCBN);

    const amountUSDCBU = toBaseUnitBN(amountUSDCBN, USDC.decimals);
    const newAmountTSD = toTokenUnitsBN(
      amountUSDCBU.multipliedBy(TSDToUSDCRatio).integerValue(BigNumber.ROUND_FLOOR),
      USDC.decimals);
    setAmountTSD(newAmountTSD);

    const newAmountTSDBU = toBaseUnitBN(newAmountTSD, TSD.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceTSDBU = toBaseUnitBN(pairBalanceTSD, TSD.decimals);
    const newAmountUNIBU = pairTotalSupplyBU.multipliedBy(newAmountTSDBU).div(pairBalanceTSDBU).integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI)
  };

  const onChangeAmountTSD = (amountTSD) => {
    if (!amountTSD) {
      setAmountTSD(new BigNumber(0));
      setAmountUSDC(new BigNumber(0));
      setAmountUNI(new BigNumber(0));
      return;
    }

    const amountTSDBN = new BigNumber(amountTSD)
    setAmountTSD(amountTSDBN);

    const amountTSDBU = toBaseUnitBN(amountTSDBN, TSD.decimals);
    const newAmountUSDC = toTokenUnitsBN(
      amountTSDBU.multipliedBy(USDCToTSDRatio).integerValue(BigNumber.ROUND_FLOOR),
      TSD.decimals);
    setAmountUSDC(newAmountUSDC);

    const newAmountUSDCBU = toBaseUnitBN(newAmountUSDC, USDC.decimals);
    const pairTotalSupplyBU = toBaseUnitBN(pairTotalSupplyUNI, UNI.decimals);
    const pairBalanceUSDCBU = toBaseUnitBN(pairBalanceUSDC, USDC.decimals);
    const newAmountUNIBU = pairTotalSupplyBU.multipliedBy(newAmountUSDCBU).div(pairBalanceUSDCBU).integerValue(BigNumber.ROUND_FLOOR);
    const newAmountUNI = toTokenUnitsBN(newAmountUNIBU, UNI.decimals);
    setAmountUNI(newAmountUNI)
  };

  return (
    <Box heading="Add Liquidity">
      <div style={{ display: 'flex' }}>
        {/* Pool Status */}
        <div style={{ width: '30%' }}>
          <BalanceBlock asset="USDC Balance" balance={userBalanceUSDC} />
        </div>
        {/* Add liquidity to pool */}
        <div style={{ width: '70%', paddingTop: '2%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '35%', marginRight: '5%' }}>
              <>
                <BigNumberInput
                  adornment="TSD"
                  value={amountTSD}
                  setter={onChangeAmountTSD}
                />
                <MaxButton
                  onClick={() => {
                    onChangeAmountTSD(userBalanceTSD);
                  }}
                />
              </>
            </div>
            <div style={{ width: '35%', marginRight: '5%' }}>
              <BigNumberInput
                adornment="USDC"
                value={amountUSDC}
                setter={onChangeAmountUSDC}
              />
              <PriceSection label="Mint " amt={amountUNI} symbol=" Pool Tokens" />
            </div>
            <div style={{ width: '30%' }}>
              <Button
                wide
                icon={<IconCirclePlus />}
                label="Add Liquidity"
                onClick={() => {
                  const amountTSDBU = toBaseUnitBN(amountTSD, TSD.decimals);
                  const amountUSDCBU = toBaseUnitBN(amountUSDC, USDC.decimals);
                  addLiquidity(
                    amountTSDBU,
                    amountUSDCBU,
                    SLIPPAGE,
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}


export default AddLiquidity;
