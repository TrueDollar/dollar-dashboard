import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BigNumber from 'bignumber.js';
import {
  getBalanceBonded,
  getBalanceOfStaged, getEpoch, getFluidUntil, getPrice0CumulativeLast, getReserves,
  getStatusOf, getTokenAllowance,
  getTokenBalance, getTokenTotalSupply, getTotalBonded, loadFluidStatusDao,
} from '../../utils/infura';
import {TSD, TSDS} from "../../constants/tokens";
import {DAO_EXIT_LOCKUP_EPOCHS} from "../../constants/values";
import { toTokenUnitsBN } from '../../utils/number';

import AccountPageHeader from "./Header";
import WithdrawDeposit from "./WithdrawDeposit";
import BondUnbond from "./BondUnbond";
import IconHeader from "../common/IconHeader";
import {getPoolAddress} from "../../utils/pool";
import {DollarPool4} from "../../constants/contracts";
import Invest from "./Invest";
import {calculateTwap, getPriceAndBlockTimestamp} from "../../utils/calculation";

function Wallet({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }
  const [userTSDBalance, setUserTSDBalance] = useState(new BigNumber(0));
  const [userTSDAllowance, setUserTSDAllowance] = useState(new BigNumber(0));
  const [userTSDSBalance, setUserTSDSBalance] = useState(new BigNumber(0));
  const [totalTSDSSupply, setTotalTSDSSupply] = useState(new BigNumber(0));
  const [userStagedBalance, setUserStagedBalance] = useState(new BigNumber(0));
  const [userBondedBalance, setUserBondedBalance] = useState(new BigNumber(0));
  const [userStatus, setUserStatus] = useState(0);
  const [userStatusUnlocked, setUserStatusUnlocked] = useState(0);
  const [lockup, setLockup] = useState(0);
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [fluidStatus, setFluidStatus] = useState({
    lastUnbond: undefined, lastBond: undefined, fluidEpoch: undefined
  });
  const [twap, setTwap] = useState(new BigNumber(0))

  //Update User balances
  useEffect(() => {
    let isCancelledApr = false;
    let isCancelledTwap = false;

    async function updateTwap() {
      const [
        price0Str,
        reserves,
        pairInfo,
      ] = await Promise.all([
        getPrice0CumulativeLast(),
        getReserves(),
        getPriceAndBlockTimestamp(),
      ]);

      if (!isCancelledTwap) {
        const {_blockTimestampLast} = reserves;

        if (pairInfo?.payload.length > 0) {
          const {price0CumulativeLast, reserves} = pairInfo.payload[0];

          const oldPrice = new BigNumber(price0CumulativeLast);
          const oldTimestamp = new BigNumber(reserves?._blockTimestampLast);
          const price0 = new BigNumber(price0Str);
          const timestamp = new BigNumber(_blockTimestampLast);

          const twap = await calculateTwap(oldPrice, oldTimestamp, price0, timestamp, 12, pairInfo.payload)

          setTwap(new BigNumber(twap))
        }
      }
    }
    async function updateAPR() {
      const [
        totalSupplyStr,
        totalBondedStr,
      ] = await Promise.all([
        getTokenTotalSupply(TSD.addr),
        getTotalBonded(TSDS.addr),
      ]);

      if (!isCancelledApr) {
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
      }
    }

    updateAPR();

    if (user === '') {
      setUserTSDBalance(new BigNumber(0));
      setUserTSDAllowance(new BigNumber(0));
      setUserTSDSBalance(new BigNumber(0));
      setTotalTSDSSupply(new BigNumber(0));
      setUserStagedBalance(new BigNumber(0));
      setUserBondedBalance(new BigNumber(0));
      setUserStatus(0);
      return;
    }
    let isCancelledUser = false;

    async function updateUserInfo() {
      const [
        tsdBalance,
        tsdAllowance,
        tsdsBalance,
        tsdsSupply,
        stagedBalance,
        bondedBalance,
        status,
        poolAddress,
        fluidUntilStr,
        totalSupplyStr,
        totalBondedStr,
        fluidStatusStr
      ] = await Promise.all([
        getTokenBalance(TSD.addr, user),
        getTokenAllowance(TSD.addr, user, TSDS.addr),
        getTokenBalance(TSDS.addr, user),
        getTokenTotalSupply(TSDS.addr),
        getBalanceOfStaged(TSDS.addr, user),
        getBalanceBonded(TSDS.addr, user),
        getStatusOf(TSDS.addr, user),
        getPoolAddress(),

        getFluidUntil(TSDS.addr, user),

        getTokenTotalSupply(TSD.addr),
        getTotalBonded(TSDS.addr),
        loadFluidStatusDao(TSDS.addr, user),
      ]);

      const userTSDBalance = toTokenUnitsBN(tsdBalance, TSD.decimals);
      const userTSDSBalance = toTokenUnitsBN(tsdsBalance, TSDS.decimals);
      const totalTSDSSupply = toTokenUnitsBN(tsdsSupply, TSDS.decimals);
      const userStagedBalance = toTokenUnitsBN(stagedBalance, TSDS.decimals);
      const userBondedBalance = toTokenUnitsBN(bondedBalance, TSDS.decimals);
      const userStatus = parseInt(status, 10);
      const fluidUntil = parseInt(fluidUntilStr, 10);

      if (!isCancelledUser) {
        setUserTSDBalance(new BigNumber(userTSDBalance));
        setUserTSDAllowance(new BigNumber(tsdAllowance));
        setUserTSDSBalance(new BigNumber(userTSDSBalance));
        setTotalTSDSSupply(new BigNumber(totalTSDSSupply));
        setUserStagedBalance(new BigNumber(userStagedBalance));
        setUserBondedBalance(new BigNumber(userBondedBalance));
        setUserStatus(userStatus);
        setUserStatusUnlocked(fluidUntil)
        setLockup(poolAddress === DollarPool4 ? DAO_EXIT_LOCKUP_EPOCHS : 1);
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
        setFluidStatus(fluidStatusStr);
      }
    }
    updateUserInfo();
    updateTwap();
    const updateUser = setInterval(updateUserInfo, 15000);
    const apr = setInterval(updateAPR, 15000);
    const twap = setInterval(updateTwap, 300000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelledUser = true;
      isCancelledApr = true;
      isCancelledTwap = true;
      clearInterval(updateUser);
      clearInterval(apr);
      clearInterval(twap);
    };
  }, [user]);

  let expRate = twap.minus(1).div(10);

  if (expRate.toNumber() <= 0) {
    expRate = new BigNumber(0);
  }

  return (
    <>
      <IconHeader icon={<i className="fas fa-dot-circle"/>} text="DAO"/>

      <Invest
        totalSupply={totalSupply}
        totalBonded={totalBonded}
        expRate={expRate}
      />

      <AccountPageHeader
        user={user}
        accountTSDBalance={userTSDBalance}
        accountTSDSBalance={userTSDSBalance}
        totalTSDSSupply={totalTSDSSupply}
        accountStagedBalance={userStagedBalance}
        accountBondedBalance={userBondedBalance}
        accountStatus={userStatus}
        unlocked={userStatusUnlocked}
        fluidEpoch={fluidStatus?.fluidEpoch}
      />

      <WithdrawDeposit
        user={user}
        balance={userTSDBalance}
        allowance={userTSDAllowance}
        stagedBalance={userStagedBalance}
        status={userStatus}
      />

      <BondUnbond
        staged={userStagedBalance}
        bonded={userBondedBalance}
        status={userStatus}
        lockup={lockup}
      />
    </>
  );
}

export default Wallet;
