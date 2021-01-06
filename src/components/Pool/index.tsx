import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '@aragon/ui';
import BigNumber from 'bignumber.js';

import {
  getPoolBalanceOfBonded, getPoolBalanceOfClaimable,
  getPoolBalanceOfRewarded,
  getPoolBalanceOfStaged,
  getPoolStatusOf, getPoolTotalBonded,
  getTokenAllowance,
  getTokenBalance,
  getPoolFluidUntil, getTokenTotalSupply, loadFluidStatusPool
} from '../../utils/infura';
import {TSD, UNI, USDC, ZAP, ESD} from "../../constants/tokens";
import {POOL_EXIT_LOCKUP_EPOCHS} from "../../constants/values";
import { toTokenUnitsBN } from '../../utils/number';

import WithdrawDeposit from "./WithdrawDeposit";
import BondUnbond from "./BondUnbond";
import PoolPageHeader from "./Header";
import Claim from "./Claim";
import Provide from "./Provide";
import IconHeader from "../common/IconHeader";
import Migrate from "./Migrate";
import AddUni from "./AddUni";
import {getLegacyPoolAddress, getPoolAddress} from "../../utils/pool";
import {DollarPool4} from "../../constants/contracts";
import Invest from "./Invest";

function Pool({ user }: {user: string}) {
  const { override } = useParams();
  if (override) {
    user = override;
  }

  const [poolAddress, setPoolAddress] = useState("");
  const [poolTotalBonded, setPoolTotalBonded] = useState(new BigNumber(0));
  const [pairBalanceTSD, setPairBalanceTSD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));
  const [userUNIBalance, setUserUNIBalance] = useState(new BigNumber(0));
  const [userUNIAllowance, setUserUNIAllowance] = useState(new BigNumber(0));
  const [userUSDCBalance, setUserUSDCBalance] = useState(new BigNumber(0));
  const [userUSDCAllowance, setUserUSDCAllowance] = useState(new BigNumber(0));
  const [userStagedBalance, setUserStagedBalance] = useState(new BigNumber(0));
  const [userBondedBalance, setUserBondedBalance] = useState(new BigNumber(0));
  const [userRewardedBalance, setUserRewardedBalance] = useState(new BigNumber(0));
  const [userClaimableBalance, setUserClaimableBalance] = useState(new BigNumber(0));
  const [userStatus, setUserStatus] = useState(0);
  const [userStatusUnlocked, setUserStatusUnlocked] = useState(0);
  const [legacyUserStagedBalance, setLegacyUserStagedBalance] = useState(new BigNumber(0));
  const [legacyUserBondedBalance, setLegacyUserBondedBalance] = useState(new BigNumber(0));
  const [legacyUserRewardedBalance, setLegacyUserRewardedBalance] = useState(new BigNumber(0));
  const [legacyUserClaimableBalance, setLegacyUserClaimableBalance] = useState(new BigNumber(0));
  const [legacyUserStatus, setLegacyUserStatus] = useState(0);
  const [lockup, setLockup] = useState(0);
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [fluidStatus, setFluidStatus] = useState({
    lastUnbond: undefined, lastBond: undefined, fluidEpoch: undefined
  });
  const [zapUSDCAllowance, setZapUSDCAllowance] = useState(new BigNumber(0));
  const [zapTSDAllowance, setZapTSDAllowance] = useState(new BigNumber(0));
  const [zapESDAllowance, setZapESDAllowance] = useState(new BigNumber(0));
  const [userTSDBalance, setUserTSDBalance] = useState(new BigNumber(0));
  const [userESDBalance, setUserESDBalance] = useState(new BigNumber(0));

  //Update User balances
  useEffect(() => {
    let isCancelledApr = false;
    async function updateAPR() {
      const [
        totalSupplyStr,
        totalBondedStr,
      ] = await Promise.all([
        getTokenTotalSupply(TSD.addr),
        getTokenBalance(TSD.addr, UNI.addr),
      ]);

      if (!isCancelledApr) {
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setPairBalanceTSD(toTokenUnitsBN(totalBondedStr, TSD.decimals));
      }
    }

    updateAPR();

    if (user === '') {
      setPoolAddress("");
      setPoolTotalBonded(new BigNumber(0));
      setPairBalanceTSD(new BigNumber(0));
      setPairBalanceUSDC(new BigNumber(0));
      setUserUNIBalance(new BigNumber(0));
      setUserUNIAllowance(new BigNumber(0));
      setUserUSDCBalance(new BigNumber(0));
      setUserUSDCAllowance(new BigNumber(0));
      setUserStagedBalance(new BigNumber(0));
      setUserBondedBalance(new BigNumber(0));
      setUserRewardedBalance(new BigNumber(0));
      setUserClaimableBalance(new BigNumber(0));
      setUserStatus(0);
      setUserStatusUnlocked(0);
      setLegacyUserStagedBalance(new BigNumber(0));
      setLegacyUserBondedBalance(new BigNumber(0));
      setLegacyUserRewardedBalance(new BigNumber(0));
      setLegacyUserClaimableBalance(new BigNumber(0));
      setLegacyUserStatus(0);
      setZapUSDCAllowance(new BigNumber(0));
      setZapTSDAllowance(new BigNumber(0));
      setZapESDAllowance(new BigNumber(0));
      setUserTSDBalance(new BigNumber(0));
      setUserESDBalance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddressStr = await getPoolAddress();
      const legacyPoolAddress = getLegacyPoolAddress(poolAddressStr);

      const [
        poolTotalBondedStr,
        pairBalanceTSDStr,
        pairBalanceUSDCStr,
        balance,
        usdcBalance,
        allowance,
        usdcAllowance,
        stagedBalance,
        bondedBalance,
        rewardedBalance,
        claimableBalance,
        status,
        fluidUntilStr,
        legacyStagedBalance,
        legacyBondedBalance,
        legacyRewardedBalance,
        legacyClaimableBalance,
        legacyStatus,
        fluidStatusStr,
        zapUSDCAllowance,
        zapTSDAllowance,
        zapESDAllowance,
        userTSDBalanceStr,
        userESDBalanceStr,
      ] = await Promise.all([
        getPoolTotalBonded(poolAddressStr),
        getTokenBalance(TSD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),
        getTokenBalance(UNI.addr, user),
        getTokenBalance(USDC.addr, user),

        getTokenAllowance(UNI.addr, user, poolAddressStr),
        getTokenAllowance(USDC.addr, user, poolAddressStr),
        getPoolBalanceOfStaged(poolAddressStr, user),
        getPoolBalanceOfBonded(poolAddressStr, user),

        getPoolBalanceOfRewarded(poolAddressStr, user),
        getPoolBalanceOfClaimable(poolAddressStr, user),
        getPoolStatusOf(poolAddressStr, user),
        getPoolFluidUntil(poolAddressStr, user),

        getPoolBalanceOfStaged(legacyPoolAddress, user),
        getPoolBalanceOfBonded(legacyPoolAddress, user),
        getPoolBalanceOfRewarded(legacyPoolAddress, user),
        getPoolBalanceOfClaimable(legacyPoolAddress, user),
        getPoolStatusOf(legacyPoolAddress, user),
        loadFluidStatusPool(poolAddressStr, user),
        getTokenAllowance(USDC.addr, user, ZAP.addr),
        getTokenAllowance(TSD.addr, user, ZAP.addr),
        getTokenAllowance(ESD.addr, user, ZAP.addr),
        getTokenBalance(TSD.addr, user),
        getTokenBalance(ESD.addr, user),
      ]);

      const poolTotalBonded = toTokenUnitsBN(poolTotalBondedStr, TSD.decimals);
      const pairTSDBalance = toTokenUnitsBN(pairBalanceTSDStr, TSD.decimals);
      const pairUSDCBalance = toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals);
      const userUNIBalance = toTokenUnitsBN(balance, UNI.decimals);
      const userUSDCBalance = toTokenUnitsBN(usdcBalance, USDC.decimals);
      const userStagedBalance = toTokenUnitsBN(stagedBalance, UNI.decimals);
      const userBondedBalance = toTokenUnitsBN(bondedBalance, UNI.decimals);
      const userRewardedBalance = toTokenUnitsBN(rewardedBalance, TSD.decimals);
      const userClaimableBalance = toTokenUnitsBN(claimableBalance, TSD.decimals);
      const userStatus = parseInt(status, 10);
      const fluidUntil = parseInt(fluidUntilStr, 10);
      const legacyUserStagedBalance = toTokenUnitsBN(legacyStagedBalance, UNI.decimals);
      const legacyUserBondedBalance = toTokenUnitsBN(legacyBondedBalance, UNI.decimals);
      const legacyUserRewardedBalance = toTokenUnitsBN(legacyRewardedBalance, UNI.decimals);
      const legacyUserClaimableBalance = toTokenUnitsBN(legacyClaimableBalance, TSD.decimals);
      const legacyUserStatus = parseInt(legacyStatus, 10);
      const userTSDBalance = toTokenUnitsBN(userTSDBalanceStr, TSD.decimals);
      const userESDBalance = toTokenUnitsBN(userESDBalanceStr, ESD.decimals);

      if (!isCancelled) {
        setPoolAddress(poolAddressStr);
        setPoolTotalBonded(new BigNumber(poolTotalBonded));
        setPairBalanceTSD(new BigNumber(pairTSDBalance));
        setPairBalanceUSDC(new BigNumber(pairUSDCBalance));
        setUserUNIBalance(new BigNumber(userUNIBalance));
        setUserUNIAllowance(new BigNumber(allowance));
        setUserUSDCAllowance(new BigNumber(usdcAllowance));
        setUserUSDCBalance(new BigNumber(userUSDCBalance));
        setUserStagedBalance(new BigNumber(userStagedBalance));
        setUserBondedBalance(new BigNumber(userBondedBalance));
        setUserRewardedBalance(new BigNumber(userRewardedBalance));
        setUserClaimableBalance(new BigNumber(userClaimableBalance));
        setUserStatus(userStatus);
        setUserStatusUnlocked(fluidUntil);
        setLegacyUserStagedBalance(new BigNumber(legacyUserStagedBalance));
        setLegacyUserBondedBalance(new BigNumber(legacyUserBondedBalance));
        setLegacyUserRewardedBalance(new BigNumber(legacyUserRewardedBalance));
        setLegacyUserClaimableBalance(new BigNumber(legacyUserClaimableBalance));
        setLegacyUserStatus(legacyUserStatus);
        setLockup(poolAddressStr === DollarPool4 ? POOL_EXIT_LOCKUP_EPOCHS : 1);
        setFluidStatus(fluidStatusStr);
        setZapUSDCAllowance(new BigNumber(zapUSDCAllowance));
        setZapTSDAllowance(new BigNumber(zapTSDAllowance));
        setZapESDAllowance(new BigNumber(zapESDAllowance));
        setUserTSDBalance(new BigNumber(userTSDBalance));
        setUserESDBalance(new BigNumber(userESDBalance));
      }
    }
    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);
    const apr = setInterval(updateAPR, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
      clearInterval(apr)
    };
  }, [user]);
  // Check for error in .call()
  const isRewardedNegative = legacyUserRewardedBalance.isGreaterThan(new BigNumber("1000000000000000000"));
  const hasLegacyBalance = legacyUserStagedBalance.isGreaterThan(0) || legacyUserClaimableBalance.isGreaterThan(0) || legacyUserBondedBalance.isGreaterThan(0);

  return (
    <>
      <IconHeader icon={<i className="fas fa-parachute-box"/>} text="LP Reward Pool"/>

      <Invest
        totalSupply={totalSupply}
        TSDLPBonded={pairBalanceTSD}
      />

      {/*{hasLegacyBalance ?*/}
      {/*  <>*/}
      {/*    <Header primary={"Legacy Pool Migration"}/>*/}

      {/*    <Migrate*/}
      {/*      legacyPoolAddress={getLegacyPoolAddress(poolAddress)}*/}
      {/*      isRewardNegative={isRewardedNegative}*/}
      {/*      staged={legacyUserStagedBalance}*/}
      {/*      claimable={legacyUserClaimableBalance}*/}
      {/*      bonded={legacyUserBondedBalance}*/}
      {/*      status={legacyUserStatus}*/}
      {/*    />*/}
      {/*  </>*/}
      {/*  : ''}*/}

      <PoolPageHeader
        user={user}
        accountUNIBalance={userUNIBalance}
        accountBondedBalance={userBondedBalance}
        accountRewardedTSDBalance={userRewardedBalance}
        accountClaimableTSDBalance={userClaimableBalance}
        poolTotalBonded={poolTotalBonded}
        accountPoolStatus={userStatus}
        unlocked={userStatusUnlocked}
        fluidEpoch={fluidStatus?.fluidEpoch}
      />

      <AddUni
        user={user}
        accountUNIBalance={userUNIBalance}
        balanceUSDC={userUSDCBalance}
        balanceTSD={userTSDBalance}
        balanceESD={userESDBalance}
        zapUSDCAllowance={zapUSDCAllowance}
        zapTSDAllowance={zapTSDAllowance}
        zapESDAllowance={zapESDAllowance}
      />

      <WithdrawDeposit
        poolAddress={poolAddress}
        user={user}
        balance={userUNIBalance}
        allowance={userUNIAllowance}
        stagedBalance={userStagedBalance}
        status={userStatus}
      />

      <BondUnbond
        poolAddress={poolAddress}
        staged={userStagedBalance}
        bonded={userBondedBalance}
        status={userStatus}
        lockup={lockup}
      />

      <Claim
        poolAddress={poolAddress}
        claimable={userClaimableBalance}
        status={userStatus}
      />

      <Provide
        poolAddress={poolAddress}
        user={user}
        rewarded={isRewardedNegative ? new BigNumber(0) : userRewardedBalance}
        status={userStatus}
        pairBalanceTSD={pairBalanceTSD}
        pairBalanceUSDC={pairBalanceUSDC}
        userUSDCBalance={userUSDCBalance}
        userUSDCAllowance={userUSDCAllowance}
      />
    </>
  );
}

export default Pool;
