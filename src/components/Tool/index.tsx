import React, {useEffect, useState} from 'react';
import styled from 'styled-components'

import NextEpoch from "./NextEpoch";
import {
  getEpoch,
  getPoolTotalBonded, getPoolTotalStaged, getTokenBalance,
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

  const price = pairBalanceUSDC.dividedBy(pairBalanceTSD);

  useEffect(() => {
    let isCancelled = false;

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
        totalCouponsStr
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
    const id = setInterval(getTool, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, []);

  const increaseBy = (totalSupply.toNumber() * 4) / 100;
  const daoBonding = (((totalSupply.toNumber() * 4) / 100) * 60) / 100;
  const lpBonding = (((totalSupply.toNumber() * 4) / 100) * 40) / 100;

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
        <p>N/A (Bootstrapping price - $1.44)</p>
      </div>
      <div>
        <Title>Epoch</Title>
        <p>{epoch}</p>
      </div>
    </ContainerItem>
    <ContainerItem>
      <div style={{width: '48%'}}>
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
      <div style={{width: '48%'}}>
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
    />
  </Container>
}

const Header = styled.div`
  text-align: center;
`

const Container = styled.div`
  padding: 1%;
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