import React from 'react';
import {
  Box, Button, IconCirclePlus,
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import { approve } from '../../utils/web3';

import {TSD, USDC} from "../../constants/tokens";
import {MAX_UINT256} from "../../constants/values";
import {UniswapV2Router02} from "../../constants/contracts";

type UniswapApproveCollateralProps = {
  user: string,
  userAllowanceTSD: BigNumber
  userAllowanceUSDC: BigNumber
};

function UniswapApproveCollateral({
  user, userAllowanceTSD, userAllowanceUSDC,
}: UniswapApproveCollateralProps) {
  return (
    <Box heading="Unlock for Uniswap">
      <div style={{display: 'flex'}}>
        <div style={{width: '40%'}} />
        {/* Approve Uniswap Router to spend TSD */}
        <div style={{width: '27%', paddingTop: '2%'}}>
          <Button
            wide
            icon={<IconCirclePlus />}
            label="Unlock TSD"
            onClick={() => {
              approve(TSD.addr, UniswapV2Router02);
            }}
            disabled={user === '' || userAllowanceTSD.comparedTo(MAX_UINT256) === 0}
          />
        </div>
        {/* Approve Uniswap Router to spend USDC */}
        <div style={{width: '6%'}} />
        <div style={{width: '27%', paddingTop: '2%'}}>
          <Button
            wide
            icon={<IconCirclePlus />}
            label="Unlock USDC"
            onClick={() => {
              approve(USDC.addr, UniswapV2Router02);
            }}
            disabled={user === '' || userAllowanceUSDC.comparedTo(MAX_UINT256.dividedBy(2)) > 0}
          />
        </div>
      </div>
    </Box>
  );
}

export default UniswapApproveCollateral;