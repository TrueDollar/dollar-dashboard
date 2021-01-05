import React, {Fragment} from 'react';
import BigNumber from 'bignumber.js';
import {Button} from '@aragon/ui';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";
import {UNISWAP_TRADE} from "../../constants/contracts";

type AccountPageHeaderProps = {
  accountTSDBalance: BigNumber,
  accountTSDSBalance: BigNumber,
  totalTSDSSupply: BigNumber,
  accountStagedBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountStatus: number,
  unlocked: number,
  fluidEpoch: number,
  user: string
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus) {
  return STATUS_MAP[accountStatus]
}

const AccountPageHeader = ({
  accountTSDBalance, accountTSDSBalance, totalTSDSSupply, accountStagedBalance, accountBondedBalance, accountStatus, unlocked, fluidEpoch, user
}: AccountPageHeaderProps) => (
  <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap' }}>
    <div style={{ flexBasis: '20%' }}>
      <BalanceBlock asset="Balance" balance={accountTSDBalance} suffix={" TSD"}/>
      <Button
        label="Buy TSD"
        icon={<i className="fas fa-exchange-alt"/>}
        onClick={() => window.open(UNISWAP_TRADE, "_blank")}
      />
    </div>
    <div style={{ flexBasis: '20%' }}>
      <BalanceBlock asset="Staged" balance={accountStagedBalance}  suffix={" TSD"}/>
    </div>
    <div style={{ flexBasis: '20%' }}>
      <BalanceBlock asset="Bonded" balance={accountBondedBalance} suffix={" TSD"} />
    </div>
    <div style={{ flexBasis: '20%' }}>
      <BalanceBlock asset="DAO Ownership" balance={ownership(accountTSDSBalance, totalTSDSSupply)}  suffix={"%"}/>
    </div>
    <div style={{ flexBasis: '20%' }}>
      <TextBlock label="Status" text={status(accountStatus)}/>
      {
        user !== '' && (
          <Fragment>
            <p>
              <p>{
                isNaN(fluidEpoch)
                  ? 'You did not bonded or unbonded before.'
                  : `You last bonded or unbonded at epoch ${fluidEpoch}.`
              } </p>
              </p>
            {
              accountStatus !== 0 && (
                <p>Unlocked at epoch {fluidEpoch + 72}.</p>
              )
            }
          </Fragment>
        )
      }
    </div>
  </div>
);


export default AccountPageHeader;
