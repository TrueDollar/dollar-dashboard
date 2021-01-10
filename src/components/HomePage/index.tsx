import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Box} from '@aragon/ui';
import styled from 'styled-components'
import './style.css';
import BigNumber from "bignumber.js";
import {
  getPoolTotalClaimable,
  getPoolTotalRewarded,
  getTokenBalance,
  getTokenTotalSupply,
  getTotalBonded,
  getTotalRedeemable,
  getTotalStaged
} from "../../utils/infura";
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

function HomePage({user}: HomePageProps) {
  const history = useHistory();
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

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      const poolAddress = await getPoolAddress();
      const legacyPoolAddress = getLegacyPoolAddress(poolAddress);

      const [
        pairBalanceTSDStr,
        pairBalanceUSDCStr,
        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalRedeemableStr,
        poolLiquidityStr,
        poolTotalRewardedStr,
        poolTotalClaimableStr,
      ] = await Promise.all([
        getTokenBalance(TSD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),

        getTokenTotalSupply(TSD.addr),
        getTotalBonded(TSDS.addr),
        getTotalStaged(TSDS.addr),
        getTotalRedeemable(TSDS.addr),

        getTokenBalance(TSD.addr, UNI.addr),
        getPoolTotalRewarded(poolAddress),
        getPoolTotalClaimable(poolAddress),

        getPoolTotalRewarded(legacyPoolAddress),
        getPoolTotalClaimable(legacyPoolAddress),

      ]);

      if (!isCancelled) {
        setPairBalanceTSD(toTokenUnitsBN(pairBalanceTSDStr, TSD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));

        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, TSD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, TSD.decimals));

        setPoolLiquidity(toTokenUnitsBN(poolLiquidityStr, TSD.decimals));
        setPoolTotalRewarded(toTokenUnitsBN(poolTotalRewardedStr, TSD.decimals));
        setPoolTotalClaimable(toTokenUnitsBN(poolTotalClaimableStr, TSD.decimals));

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

  return (
    <>
      <Container className="home-box">
        <div style={{flexBasis: '30%'}}>
          <div style={{height: '100%'}}>
            <EpochBlock epoch={epochTime}/>
          </div>
        </div>
        <div style={{flexBasis: '30%'}}>
          <div style={{height: '100%'}}>
            <TotalSupply totalSupply={totalSupply}/>
          </div>
        </div>
        <div style={{flexBasis: '30%'}}>
          <div style={{height: '100%'}}>
            <MarketCap
              totalSupply={totalSupply}
              pairBalanceUSDC={pairBalanceUSDC}
              pairBalanceTSD={pairBalanceTSD}
            />
          </div>
        </div>
      </Container>
      <Trade
        pairBalanceTSD={pairBalanceTSD}
        pairBalanceUSDC={pairBalanceUSDC}
        uniswapPair={UNI.addr}
      />
      <Invest
        totalSupply={totalSupply}
        totalBonded={totalBonded}
        TSDLPBonded={pairBalanceTSD}
      />
      <Regulation
        totalSupply={totalSupply}

        totalBonded={totalBonded}
        totalStaged={totalStaged}
        totalRedeemable={totalRedeemable}

        poolLiquidity={poolLiquidity}
        poolRewarded={poolTotalRewarded}
        poolClaimable={poolTotalClaimable}
      />

      <Container className="box-cupons">
        <div>
          <MainButton
            title="Governance"
            description="Vote on upgrades."
            icon={<img src="./home/governance.png" />}
            onClick={() => {
              history.push('/governance/');
            }}
          />
        </div>
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

        <div>
          <MainButton
            title="Coupons"
            description="Purchase and redeem coupons."
            icon={<img src="./home/coupons.png" />}
            onClick={() => {
              history.push('/coupons/');
            }}
          />
        </div>

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
