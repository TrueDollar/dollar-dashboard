import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import NextEpoch from "./NextEpoch";
import {
  getEpoch,
  getPoolTotalBonded, getPoolTotalStaged, getPrice0CumulativeLast, getReserves, getTokenBalance,
  getTokenTotalSupply,
  getTotalBonded, getTotalCoupons, getTotalDebt,
  getTotalRedeemable,
  getTotalStaged,
  getTotalSupplyUni
} from "../../utils/infura";
import {TSD, TSDS, UNI, USDC} from "../../constants/tokens";
import BigNumber from "bignumber.js";
import {toTokenUnitsBN} from "../../utils/number";
import TokenDistribution from "./TokenDistribution";
import HistoryReturn from "./HistoryReturn";
import {getPoolAddress} from "../../utils/pool";
import {calculateTwap, getPriceAndBlockTimestamp} from "../../utils/calculation";

function Tool() {
  const [epoch, setEpoch] = useState(0);

  const [totalSupply, setTotalSupply] = useState(new BigNumber(0));
  const [totalBonded, setTotalBonded] = useState(new BigNumber(0));
  const [totalStaged, setTotalStaged] = useState(new BigNumber(0));
  const [totalSupplyUni, setTotalSupplyUni] = useState(new BigNumber(0));
  const [poolTotalBonded, setPoolTotalBonded] = useState(new BigNumber(0));
  const [poolTotalStaged, setPoolTotalStaged] = useState(new BigNumber(0));

  const [totalRedeemable, setTotalRedeemable] = useState(new BigNumber(0));

  const [totalDebt, setTotalDebt] = useState(new BigNumber(0));
  const [totalCoupons, setTotalCoupons] = useState(new BigNumber(0));

  const [pairBalanceTSD, setPairBalanceTSD] = useState(new BigNumber(0));
  const [pairBalanceUSDC, setPairBalanceUSDC] = useState(new BigNumber(0));
  const [twap, setTwap] = useState(new BigNumber(0))

  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);

  useEffect(() => {
    let isCancelled = false;
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

          const twap = await calculateTwap(oldPrice, oldTimestamp, price0, timestamp, 12)

          setTwap(new BigNumber(twap))
        }
      }
    }
    async function getTool() {
      const poolAddressStr = await getPoolAddress();

      const [
        epochStr,

        pairBalanceTSDStr,
        pairBalanceUSDCStr,

        totalSupplyStr,
        totalBondedStr,
        totalStagedStr,
        totalSupplyUniStr,
        poolTotalBondedStr,
        poolTotalStagedStr,
        totalRedeemableStr,
        totalDebtStr,
        totalCouponsStr,
      ] = await Promise.all([
        getEpoch(TSDS.addr),

        getTokenBalance(TSD.addr, UNI.addr),
        getTokenBalance(USDC.addr, UNI.addr),

        getTokenTotalSupply(TSD.addr),
        getTotalBonded(TSDS.addr),
        getTotalStaged(TSDS.addr),
        getTotalSupplyUni(),
        getPoolTotalBonded(poolAddressStr),
        getPoolTotalStaged(poolAddressStr),

        getTotalRedeemable(TSDS.addr),
        getTotalDebt(TSDS.addr),
        getTotalCoupons(TSDS.addr),
      ]);

      if (!isCancelled) {
        setEpoch(parseInt(epochStr, 10));

        setPairBalanceTSD(toTokenUnitsBN(pairBalanceTSDStr, TSD.decimals));
        setPairBalanceUSDC(toTokenUnitsBN(pairBalanceUSDCStr, USDC.decimals));

        setTotalSupply(toTokenUnitsBN(totalSupplyStr, TSD.decimals));
        setTotalBonded(toTokenUnitsBN(totalBondedStr, TSD.decimals));
        setTotalStaged(toTokenUnitsBN(totalStagedStr, TSD.decimals));
        setTotalRedeemable(toTokenUnitsBN(totalRedeemableStr, TSD.decimals));
        setTotalSupplyUni(toTokenUnitsBN(totalSupplyUniStr, TSD.decimals));
        setPoolTotalBonded(toTokenUnitsBN(poolTotalBondedStr, TSD.decimals));
        setPoolTotalStaged(toTokenUnitsBN(poolTotalStagedStr, TSD.decimals));
        setTotalDebt(toTokenUnitsBN(totalDebtStr, TSD.decimals));
        setTotalCoupons(toTokenUnitsBN(totalCouponsStr, TSD.decimals));
      }
    }

    getTool();
    updateTwap();
    const id = setInterval(getTool, 15000);
    const twap = setInterval(updateTwap, 300000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      isCancelledTwap = true;
      clearInterval(id);
      clearInterval(twap);
    };
  }, []);

  let expRate = twap.minus(1).div(10);

  if (expRate.toNumber() <= 0) {
    expRate = new BigNumber(0);
  }

  const increaseBy = totalSupply.toNumber() * expRate.toNumber();
  const daoBonding = (totalSupply.toNumber() * expRate.toNumber()) * 0.6;
  const lpBonding = (totalSupply.toNumber() * expRate.toNumber()) * 0.6;

  return <Container>
    <Header>
      Next Epoch:
      <p>$TSD Supply will increase by {increaseBy.toFixed(2)} TSD </p>
      <p>{daoBonding.toFixed(2)} TSD for DAO Bonding and {lpBonding.toFixed(2)} TSD for LP Bonding</p>
    </Header>
    <ContainerItem>
      <NextEpoch/>
      <div>
        <Title>Spot Price</Title>
        <p>${price.toNumber().toFixed(2)} USDC</p>
      </div>
      <div>
        <Title>TWAP Price</Title>
        <p>{epoch < 240 ? 'N/A (Bootstrapping price - $1.44)' : <>${twap.toNumber().toFixed(2)} USDC</>}</p>
      </div>
      <div>
        <Title>Epoch</Title>
        <p>{epoch}</p>
      </div>
    </ContainerItem>
    <ContainerItem>
      <div style={{flexBasis: '48%', maxWidth: 300}}>
        <Title>Token Supply</Title>
        <ContainerFlex>
          <div>
            <p>Total Token:</p>
            <p>Coupons:</p>
            <p>Total Supply:</p>
            <p>Debt:</p>
          </div>
          <div className="text-right">
            <p>{(totalSupply.toNumber() - totalCoupons.toNumber()).toFixed(2)}</p>
            <p>{totalCoupons.toNumber().toFixed(2)}</p>
            <p>{totalSupply.toNumber().toFixed(2)}</p>
            <p>{totalDebt.toNumber().toFixed(2)}</p>
          </div>
        </ContainerFlex>
      </div>
      <div style={{flexBasis: '48%', maxWidth: 300}}>
        <TokenDistribution
          totalRedeemable={totalRedeemable}
          totalStaged={totalStaged}
          totalBonded={totalBonded}
          totalSupplyUni={totalSupplyUni}
          poolTotalStaged={poolTotalStaged}
          poolTotalBonded={poolTotalBonded}
        />
      </div>
    </ContainerItem>
    <HistoryReturn
      totalSupply={totalSupply}
      totalBonded={totalBonded}
      TSDLPBonded={pairBalanceTSD}
      expRate={expRate}
    />
  </Container>
}

const Header = styled.div`
  text-align: center;
`

const Container = styled.div`
  padding: 1% 15px 1% 15px;
  max-width: 800px;
  margin: 20px auto 0 auto;
`

const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
  @media (max-width: 522px) {
    display: block;
  }
`

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const Title = styled.h2`
  font-weight: bold;
`

export default Tool;