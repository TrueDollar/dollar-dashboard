import React, {useEffect, useState} from 'react';
import BigNumber from "bignumber.js";
import {
  getBalanceBonded,
  getBalanceOfStaged,
  getPoolBalanceOfBonded, getPoolBalanceOfClaimable, getPoolBalanceOfRewarded, getPoolBalanceOfStaged,
  getTokenBalance,
  getTokenTotalSupply
} from "../../utils/infura";
import {TSD, TSDS, UNI} from "../../constants/tokens";
import {formatBN, toTokenUnitsBN} from "../../utils/number";
import {getPoolAddress} from "../../utils/pool";

type TotalBalanceProps = {
  user: string,
}

function TotalBalance({ user }: TotalBalanceProps) {
  const [totalBalance, setTotalBalance] = useState(new BigNumber(0));

  //Update User balances
  useEffect(() => {
    if (user === '') {
      setTotalBalance(new BigNumber(0));
      return;
    }
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddress = await getPoolAddress();

      const [
        tsdBalance, stagedBalance, bondedBalance,
        pairBalanceTSDStr, pairTotalSupplyUNIStr, userUNIBalanceStr,
        userPoolBondedBalanceStr, userPoolStagedBalanceStr,
        userPoolRewardedBalanceStr, userPoolClaimableBalanceStr,
      ] = await Promise.all([
        getTokenBalance(TSD.addr, user),
        getBalanceOfStaged(TSDS.addr, user),
        getBalanceBonded(TSDS.addr, user),

        getTokenBalance(TSD.addr, UNI.addr),
        getTokenTotalSupply(UNI.addr),
        getTokenBalance(UNI.addr, user),
        getPoolBalanceOfBonded(poolAddress, user),
        getPoolBalanceOfStaged(poolAddress, user),
        getPoolBalanceOfRewarded(poolAddress, user),
        getPoolBalanceOfClaimable(poolAddress, user),
      ]);

      const userBalance = toTokenUnitsBN(new BigNumber(tsdBalance), TSD.decimals);
      const userStagedBalance = toTokenUnitsBN(new BigNumber(stagedBalance), TSDS.decimals);
      const userBondedBalance = toTokenUnitsBN(new BigNumber(bondedBalance), TSDS.decimals);

      const userUNIBalance = toTokenUnitsBN(new BigNumber(userUNIBalanceStr), TSDS.decimals);
      const userPoolBondedBalance = toTokenUnitsBN(new BigNumber(userPoolBondedBalanceStr), TSDS.decimals);
      const userPoolStagedBalance = toTokenUnitsBN(new BigNumber(userPoolStagedBalanceStr), TSDS.decimals);
      const userPoolRewardedBalance = toTokenUnitsBN(new BigNumber(userPoolRewardedBalanceStr), TSDS.decimals);
      const userPoolClaimableBalance = toTokenUnitsBN(new BigNumber(userPoolClaimableBalanceStr), TSDS.decimals);

      const UNItoTSD = new BigNumber(pairBalanceTSDStr).dividedBy(new BigNumber(pairTotalSupplyUNIStr));

      const daoTotalBalance = userStagedBalance.plus(userBondedBalance);
      const poolTotalBalance = UNItoTSD.multipliedBy(userPoolStagedBalance.plus(userPoolBondedBalance))
        .plus(userPoolRewardedBalance.plus(userPoolClaimableBalance));
      const circulationBalance = UNItoTSD.multipliedBy(userUNIBalance).plus(userBalance)

      const totalBalance = daoTotalBalance.plus(poolTotalBalance).plus(circulationBalance)

      if (!isCancelled) {
        setTotalBalance(totalBalance);
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <div style={{ fontSize: 14, padding: 3, fontWeight: 400, lineHeight: 1.5, fontFamily: 'aragon-ui-monospace, monospace'}}>
      {formatBN(totalBalance, 2)} TSD
    </div>
  );
}


export default TotalBalance;
