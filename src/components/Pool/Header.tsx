import React, {Fragment} from 'react';
import BigNumber from 'bignumber.js';
import {Button} from '@aragon/ui';
import {BalanceBlock} from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import {UNISWAP_TRADE} from "../../constants/contracts";

type PoolPageHeaderProps = {
  accountUNIBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountRewardedTSDBalance: BigNumber,
  accountClaimableTSDBalance: BigNumber,
  poolTotalBonded: BigNumber,
  accountPoolStatus: number,
  unlocked: number,
  fluidEpoch: any,
  user: string
};

const STATUS_MAP = ["Unlocked", "Locked"];

function status(accountStatus) {
  return STATUS_MAP[accountStatus]
}

const PoolPageHeader = ({
                          accountUNIBalance,
                          accountBondedBalance,
                          accountRewardedTSDBalance,
                          accountClaimableTSDBalance,
                          poolTotalBonded,
                          accountPoolStatus,
                          unlocked,
                          fluidEpoch,
                          user
                        }: PoolPageHeaderProps) => (
  <div style={{padding: '2%', display: 'flex', flexWrap: 'wrap'}}>
    <div style={{flexBasis: '20%'}}>
      <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={" UNI-V2"}/>
      <Button
        label="Get UNI-V2"
        icon={<i className="fas fa-exchange-alt"/>}
        onClick={() => window.open(UNISWAP_TRADE, "_blank")}
      />
    </div>
    <div style={{flexBasis: '20%'}}>
      <BalanceBlock asset="Rewarded" balance={accountRewardedTSDBalance} suffix={" TSD"}/>
    </div>
    <div style={{flexBasis: '20%'}}>
      <BalanceBlock asset="Claimable" balance={accountClaimableTSDBalance} suffix={" TSD"}/>
    </div>
    <div style={{flexBasis: '20%'}}>
      <BalanceBlock asset="Pool Ownership" balance={ownership(accountBondedBalance, poolTotalBonded)} suffix={"%"}/>
    </div>
    <div style={{flexBasis: '20%'}}>
      <TextBlock label="Pool Status" text={status(accountPoolStatus)}/>
      {
        user !== '' && (
          <Fragment>
            <p>{
              isNaN(fluidEpoch)
                ? 'You did not bonded or unbonded before.'
                : `You last bonded or unbonded at epoch ${fluidEpoch}.`
            } </p>
            {
              accountPoolStatus !== 0 && (
                <p>Unlocked at epoch {fluidEpoch + 24}.</p>
              )
            }
          </Fragment>
        )
      }
    </div>
  </div>
);


export default PoolPageHeader;
