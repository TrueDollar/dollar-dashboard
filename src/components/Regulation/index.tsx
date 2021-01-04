import React, { useState, useEffect } from 'react';
import { Header } from '@aragon/ui';

import {
  getCouponPremium,
  getPoolTotalClaimable, getPoolTotalRewarded, getTokenBalance,
  getTokenTotalSupply, getTotalBonded, getTotalCoupons, getTotalDebt, getTotalRedeemable, getTotalStaged,
} from '../../utils/infura';
import {TSD, TSDS, UNI} from "../../constants/tokens";
import {toTokenUnitsBN} from "../../utils/number";
import BigNumber from "bignumber.js";
import RegulationHeader from "./Header";
import RegulationHistory from "./RegulationHistory";
import IconHeader from "../common/IconHeader";
import {getLegacyPoolAddress, getPoolAddress} from "../../utils/pool";

const ONE_COUPON = new BigNumber(10).pow(18);

function Regulation({ user }: {user: string}) {

  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [totalStaged, setTotalStaged] = useState(new BigNumber(0));
  const [totalRedeemable, setTotalRedeemable] = useState(new BigNumber(0));
  const [poolLiquidity, setPoolLiquidity] = useState(new BigNumber(0));
  const [poolTotalRewarded, setPoolTotalRewarded] = useState(new BigNumber(0));
  const [poolTotalClaimable, setPoolTotalClaimable] = useState(new BigNumber(0));
  const [legacyPoolTotalRewarded, setLegacyPoolTotalRewarded] = useState(new BigNumber(0));
  const [legacyPoolTotalClaimable, setLegacyPoolTotalClaimable] = useState(new BigNumber(0));
  const [totalDebt, setTotalDebt] = useState(new BigNumber(0));
  const [totalCoupons, setTotalCoupons] = useState(new BigNumber(0));
  const [couponPremium, setCouponPremium] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddress = await getPoolAddress();
      const legacyPoolAddress = getLegacyPoolAddress(poolAddress);

      const [
        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalRedeemableStr,
        poolLiquidityStr,
        poolTotalRewardedStr, poolTotalClaimableStr,
        legacyPoolTotalRewardedStr, legacyPoolTotalClaimableStr,
        totalDebtStr, totalCouponsStr
      ] = await Promise.all([
        getTokenTotalSupply(TSD.addr),

        getTotalBonded(TSDS.addr),
        getTotalStaged(TSDS.addr),
        getTotalRedeemable(TSDS.addr),

        getTokenBalance(TSD.addr, UNI.addr),
        getPoolTotalRewarded(poolAddress),
        getPoolTotalClaimable(poolAddress),

        getPoolTotalRewarded(legacyPoolAddress),
        getPoolTotalClaimable(legacyPoolAddress),

        getTotalDebt(TSDS.addr),
        getTotalCoupons(TSDS.addr),
      ]);

      if (!isCancelled) {
        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));

        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, TSD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, TSD.decimals));

        setPoolLiquidity(toTokenUnitsBN(poolLiquidityStr, TSD.decimals));
        setPoolTotalRewarded(toTokenUnitsBN(poolTotalRewardedStr, TSD.decimals));
        setPoolTotalClaimable(toTokenUnitsBN(poolTotalClaimableStr, TSD.decimals));

        setLegacyPoolTotalRewarded(toTokenUnitsBN(legacyPoolTotalRewardedStr, TSD.decimals));
        setLegacyPoolTotalClaimable(toTokenUnitsBN(legacyPoolTotalClaimableStr, TSD.decimals));

        setTotalDebt(toTokenUnitsBN(totalDebtStr, TSD.decimals));
        setTotalCoupons(toTokenUnitsBN(totalCouponsStr, TSD.decimals));

        if (new BigNumber(totalDebtStr).isGreaterThan(ONE_COUPON)) {
          const couponPremiumStr = await getCouponPremium(TSDS.addr, ONE_COUPON)
          setCouponPremium(toTokenUnitsBN(couponPremiumStr, TSD.decimals));
        } else {
          setCouponPremium(new BigNumber(0));
        }
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
    <>
      <IconHeader icon={<i className="fas fa-chart-area"/>} text="Supply Regulation"/>

      <RegulationHeader
        totalSupply={totalSupply}

        totalBonded={totalBonded}
        totalStaged={totalStaged}
        totalRedeemable={totalRedeemable}

        poolLiquidity={poolLiquidity}
        poolRewarded={poolTotalRewarded}
        poolClaimable={poolTotalClaimable}

        legacyPoolRewarded={legacyPoolTotalRewarded}
        legacyPoolClaimable={legacyPoolTotalClaimable}

        totalDebt={totalDebt}
        totalCoupons={totalCoupons}
        couponPremium={couponPremium}
      />

      <Header primary="Regulation History" />

      <RegulationHistory
        user={user}
      />
    </>
  );
}

export default Regulation;
