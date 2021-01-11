import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Box, useTheme} from '@aragon/ui';
import styled from 'styled-components'
import './style.css';
import BigNumber from "bignumber.js";
import {
  getCouponPremium,
  getEpoch,
  getPoolTotalClaimable,
  getPoolTotalRewarded, getPrice0CumulativeLast, getReserves,
  getTokenBalance,
  getTokenTotalSupply,
  getTotalBonded, getTotalCoupons, getTotalDebt,
  getTotalRedeemable,
  getTotalStaged
} from "../../utils/infura";
import {Layout} from '@aragon/ui';
import {TSD, TSDS, UNI, USDC} from "../../constants/tokens";
import {toTokenUnitsBN} from "../../utils/number";
import Trade from "./Trade";
import MainButton from "./MainButton";
import {getLegacyPoolAddress, getPoolAddress} from "../../utils/pool";
import Regulation from "./Regulation";
import TotalSupply from "./TotalSupply";
import MarketCap from "./MarketCap";
import Invest from "./Invest";
import EpochBlock from "../common/EpochBlock";
import {calculateTwap, getPriceAndBlockTimestamp} from "../../utils/calculation";

function epochformatted() {
  const epochStart = 1609473600;
  const epochPeriod = 60 * 60;
  const hour = 60 * 60;
  const minute = 60;
  const unixTimeSec = Math.floor(Date.now() / 1000);

  let epochRemainder = unixTimeSec - epochStart
  const epoch = Math.floor(epochRemainder / epochPeriod);
  epochRemainder -= epoch * epochPeriod;
  const epochHour = Math.floor(epochRemainder / hour);
  epochRemainder -= epochHour * hour;
  const epochMinute = Math.floor(epochRemainder / minute);
  epochRemainder -= epochMinute * minute;
  return `${epoch}-0${epochHour}:${epochMinute > 9 ? epochMinute : "0" + epochMinute.toString()}:${epochRemainder > 9 ? epochRemainder : "0" + epochRemainder.toString()}`;
}

type HomePageProps = {
  user: string
};

const ONE_COUPON = new BigNumber(10).pow(18);

function HomePage({user}: HomePageProps) {
  const history = useHistory();
  const currentTheme = useTheme();
  const [epoch, setEpoch] = useState(0);
  const [pairBalanceTSD, setPairBalanceTSD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));
  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [totalStaged, setTotalStaged] = useState(new BigNumber(0));
  const [totalRedeemable, setTotalRedeemable] = useState(new BigNumber(0));
  const [poolLiquidity, setPoolLiquidity] = useState(new BigNumber(0));
  const [poolTotalRewarded, setPoolTotalRewarded] = useState(new BigNumber(0));
  const [poolTotalClaimable, setPoolTotalClaimable] = useState(new BigNumber(0));
  const [epochTime, setEpochTime] = useState("0-00:00:00");
  const [twap, setTwap] = useState(new BigNumber(0))
  const [totalDebt, setTotalDebt] = useState(new BigNumber(0));
  const [totalCoupons, setTotalCoupons] = useState(new BigNumber(0));
  const [couponPremium, setCouponPremium] = useState(new BigNumber(0));

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddress = await getPoolAddress();
      const legacyPoolAddress = getLegacyPoolAddress(poolAddress);

      const [
        epochStr,

        pairBalanceTSDStr,
        pairBalanceUSDCStr,
        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalRedeemableStr,
        poolLiquidityStr,
        poolTotalRewardedStr,
        poolTotalClaimableStr,

        price0Str,
        reserves,
        pairInfo,

        totalDebtStr,
        totalCouponsStr,
      ] = await Promise.all([
        getEpoch(TSDS.addr),

        getTokenBalance(TSD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),

        getTokenTotalSupply(TSD.addr),
        getTotalBonded(TSDS.addr),
        getTotalStaged(TSDS.addr),
        getTotalRedeemable(TSDS.addr),

        getTokenBalance(TSD.addr, UNI.addr),
        getPoolTotalRewarded(poolAddress),
        getPoolTotalClaimable(poolAddress),

        getPrice0CumulativeLast(),
        getReserves(),
        getPriceAndBlockTimestamp(),

        getTotalDebt(TSDS.addr),
        getTotalCoupons(TSDS.addr),
      ]);

      if (!isCancelled) {
        const {_blockTimestampLast} = reserves;

        setEpoch(parseInt(epochStr, 10));

        setPairBalanceTSD(toTokenUnitsBN(pairBalanceTSDStr, TSD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));

        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, TSD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, TSD.decimals));

        setPoolLiquidity(toTokenUnitsBN(poolLiquidityStr, TSD.decimals));
        setPoolTotalRewarded(toTokenUnitsBN(poolTotalRewardedStr, TSD.decimals));
        setPoolTotalClaimable(toTokenUnitsBN(poolTotalClaimableStr, TSD.decimals));
        setTotalDebt(toTokenUnitsBN(totalDebtStr, TSD.decimals));
        setTotalCoupons(toTokenUnitsBN(totalCouponsStr, TSD.decimals));

        if (totalDebt.isGreaterThan(new BigNumber(1))) {
          const couponPremiumStr = await getCouponPremium(TSDS.addr, ONE_COUPON)
          setCouponPremium(toTokenUnitsBN(couponPremiumStr, TSD.decimals));
        } else {
          setCouponPremium(new BigNumber(0));
        }

        if (pairInfo?.payload.length > 0) {
          const {price0CumulativeLast, reserves} = pairInfo.payload[pairInfo.payload.length - 1];

          const oldPrice = new BigNumber(price0CumulativeLast);
          const oldTimestamp = new BigNumber(reserves?._blockTimestampLast);
          const price0 = new BigNumber(price0Str);
          const timestamp = new BigNumber(_blockTimestampLast);

          const twap = await calculateTwap(oldPrice, oldTimestamp, price0, timestamp, 12)

          setTwap(new BigNumber(twap))
        }

      }
    }

    async function updateTime() {
      if (!isCancelled) {
        setEpochTime(epochformatted())
      }
    }

    updateUserInfo();
    const time = setInterval(updateTime, 1000);
    const user = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(time);
      clearInterval(user);
    };
  }, [user]);
  const theme = `${currentTheme._name === 'light' ? '' : '-white'}`

  let expRate = twap.minus(1).div(10);

  if (expRate.toNumber() <= 0) {
    expRate = new BigNumber(epoch < 240 ? 0.04 : 0);
  }

  return (
    <>
      <Container className="home-box">
        <Layout style={{ minWidth: 'auto' }}>
        <div style={{flexBasis: '32%'}}>
          <div style={{height: '100%'}}>
            <EpochBlock epoch={epochTime}/>
          </div>
        </div>
        <div style={{flexBasis: '32%'}}>
          <div style={{height: '100%'}}>
            <TotalSupply
              expRate={expRate}
              totalSupply={totalSupply}
            />
          </div>
        </div>
        <div style={{flexBasis: '32%'}}>
          <div style={{height: '100%'}}>
            <MarketCap
              totalSupply={totalSupply}
              pairBalanceUSDC={pairBalanceUSDC}
              pairBalanceTSD={pairBalanceTSD}
            />
          </div>
        </div>
        </Layout>
      </Container>

      <Layout style={{ minWidth: 'auto' }}>
      <Trade
        pairBalanceTSD={pairBalanceTSD}
        pairBalanceUSDC={pairBalanceUSDC}
        uniswapPair={UNI.addr}
        theme={theme}
      />
      <Invest
        expRate={expRate}
        totalSupply={totalSupply}
        totalBonded={totalBonded}
        TSDLPBonded={pairBalanceTSD}

        theme={theme}
      />
      <Regulation
        totalSupply={totalSupply}

        totalBonded={totalBonded}
        totalStaged={totalStaged}
        totalRedeemable={totalRedeemable}

        poolLiquidity={poolLiquidity}
        poolRewarded={poolTotalRewarded}
        poolClaimable={poolTotalClaimable}
        theme={theme}
      />

      <Container className="box-cupons">
        <Box>
          <MainButton
            title="Governance"
            description="Vote on upgrades."
            icon={<img src="./home/governance.png" />}
            onClick={() => {
              history.push('/governance/');
            }}
          />
        </Box>
        {/*<div style={{flexBasis: '30%', marginRight: '3%', marginLeft: '2%'}}>*/}
        {/*  <MainButton*/}
        {/*    title="DAO"*/}
        {/*    description="Earn rewards for governing"*/}
        {/*    icon={<i className="fas fa-dot-circle"/>}*/}
        {/*    onClick={() => {*/}
        {/*      history.push('/dao/');*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}

        <Box>
          <MainButton
            title="Coupons"
            description="Purchase and redeem coupons."
            icon={<img src="./home/coupons.png" />}
            onClick={() => {
              history.push('/coupons/');
            }}
          />
        </Box>

        {/*<div style={{flexBasis: '30%'}}>*/}
        {/*  <MainButton*/}
        {/*    title="LP Rewards"*/}
        {/*    description="Earn rewards for providing liquidity."*/}
        {/*    icon={<i className="fas fa-parachute-box"/>}*/}
        {/*    onClick={() => {*/}
        {/*      history.push('/pool/');*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}

        {/*<div style={{flexBasis: '30%', marginLeft: '3%', marginRight: '2%'}}>*/}
        {/*  <MainButton*/}
        {/*    title="Regulation"*/}
        {/*    description="Network supply regulation statistics."*/}
        {/*    icon={<i className="fas fa-chart-area"/>}*/}
        {/*    onClick={() => {*/}
        {/*      history.push('/regulation/');*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}
      </Container>
      {/*<div style={{padding: '1%', display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>*/}


      {/*  <div style={{flexBasis: '30%'}}>*/}
      {/*    <MainButton*/}
      {/*      title="Trade"*/}
      {/*      description="Trade døllar tokens."*/}
      {/*      icon={<i className="fas fa-exchange-alt"/>}*/}
      {/*      onClick={() => {*/}
      {/*        history.push('/trade/');*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}

      {/*  */}
      {/*</div>*/}
      </Layout>
    </>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10% 1% 3% 1%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
  @media (max-width: 522px) {
    display: block;
  }
`

export default HomePage;
