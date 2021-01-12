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
      <Value>
        Next Epoch:
      </Value>
      <Value>$TSD Supply will increase by {increaseBy.toFixed(2)} TSD </Value>
      <Value>{daoBonding.toFixed(2)} TSD for DAO Bonding and {lpBonding.toFixed(2)} TSD for LP Bonding</Value>
    </Header>
    <Box>
      <InfoPrice>
        <NextEpoch/>
        <ContainerInfoPrice>
          <Title>Spot Price</Title>
          <Value>${price.toNumber().toFixed(2)} USDC</Value>
        </ContainerInfoPrice>
        <ContainerInfoPrice>
          <Title>TWAP Price</Title>
          <Value>{epoch < 240 ? 'N/A (Bootstrapping price - $1.44)' : <>${twap.toNumber().toFixed(2)} USDC</>}</Value>
        </ContainerInfoPrice>
        <ContainerInfoPrice>
          <Title>Epoch</Title>
          <Value>{epoch}</Value>
        </ContainerInfoPrice>
      </InfoPrice>
      <InfoToken>
        <TokenSupply>
          <Title><strong>Token Supply</strong></Title>
          <div>
            <ContainerFlex>
              <p>Total Token:</p>
              <Space/>
              <Value>{(totalSupply.toNumber() - totalCoupons.toNumber()).toFixed(2)}</Value>
            </ContainerFlex>
            <ContainerFlex>
              <p>Coupons:</p>
              <Space/>
              <Value>{totalCoupons.toNumber().toFixed(2)}</Value>
            </ContainerFlex>
            <ContainerFlex>
              <p>Total Supply:</p>
              <Space/>
              <Value>{totalSupply.toNumber().toFixed(2)}</Value>
            </ContainerFlex>
            <ContainerFlex>
              <p>Debt:</p>
              <Space/>
              <Value>{totalDebt.toNumber().toFixed(2)}</Value>
            </ContainerFlex>
          </div>
        </TokenSupply>
        <TokenDistribution
          totalRedeemable={totalRedeemable}
          totalStaged={totalStaged}
          totalBonded={totalBonded}
          totalSupplyUni={totalSupplyUni}
          poolTotalStaged={poolTotalStaged}
          poolTotalBonded={poolTotalBonded}
        />
      </InfoToken>
      <HistoryReturn
        totalSupply={totalSupply}
        totalBonded={totalBonded}
        TSDLPBonded={pairBalanceTSD}
        expRate={expRate}
      />
    </Box>
  </Container>
}

const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
  @media (max-width: 522px) {
    margin-bottom: 0px;
  }
`

const Container = styled.div`
  max-width: 1520px;
  margin: 20px auto 0 auto;
`

const Box = styled.div`
  box-shadow: 0px 10px 20px #00000029;
  border-radius: 10px;
`

const InfoPrice = styled.div`
  display: grid;
  padding: 30px 50px;
  grid-template-columns: auto auto auto auto;
  border-bottom: 1px solid #707070;
  @media (max-width: 522px) {
    grid-template-columns: auto auto;
    padding: 20px;
  }
`

const ContainerInfoPrice = styled.div`
  text-align: center;
`

const Space = styled.div`
  flex: 1;
  border-bottom: 1px dotted rgb(136, 136, 136);
  margin-left: 10px;
  margin-right: 5px;
`

const InfoToken = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid #707070;
  @media (max-width: 522px) {
    display: block;
    padding: 20px 10px;
  }
`

const TokenSupply = styled.div`
  flex-basis: 50%;
  padding: 30px 50px;
  border-right: 1px solid #707070;
  @media (max-width: 522px) {
    border-right: none;
    padding: 0;
  }
`

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: baseline;
  margin-bottom: 10px;
`

const Title = styled.h2`
  font-size: 19px;
  margin-bottom: 10px;
`

const Value = styled.h2`
  font-size: 19px;
`

export default Tool;