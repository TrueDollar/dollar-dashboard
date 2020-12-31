import React from 'react';
import BigNumber from 'bignumber.js';

import { BalanceBlock } from '../common/index';
import TextBlock from "../common/TextBlock";
import {ownership} from "../../utils/number";

type AccountPageHeaderProps = {
  accountTSDBalance: BigNumber,
  accountTSDSBalance: BigNumber,
  totalTSDSSupply: BigNumber,
  accountStagedBalance: BigNumber,
  accountBondedBalance: BigNumber,
  accountStatus: number,
  unlocked: number,
};

const STATUS_MAP = ["Unlocked", "Locked", "Locked"];

function status(accountStatus) {
  return STATUS_MAP[accountStatus]
}

const AccountPageHeader = ({
  accountTSDBalance, accountTSDSBalance, totalTSDSSupply, accountStagedBalance, accountBondedBalance, accountStatus, unlocked
}: AccountPageHeaderProps) => (
  <div style={{ padding: '2%', display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
    <div style={{ flexBasis: '20%' }}>
      <BalanceBlock asset="Balance" balance={accountTSDBalance} suffix={" TSD"}/>
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
    </div>
  </div>
);


export default AccountPageHeader;
