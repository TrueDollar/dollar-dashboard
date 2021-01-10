import React from 'react';
import {
  Box
} from '@aragon/ui';
import BigNumber from 'bignumber.js';
import styled from 'styled-components'

import {BalanceBlock} from '../common/index';
import {approve, approveTSD, approveDSD, approveESD, approveZAI, approveUSDT} from '../../utils/web3';
import {buyUniV2, buyUniV2FromProxy} from '../../utils/infura';
import {toBaseUnitBN} from '../../utils/number';
import {ZAP, USDC, TSD, ESD, DSD, ZAI, USDT} from "../../constants/tokens";
import ZapUni from "./ZapUni";

type AddUniProps = {
  user: string
  balanceUSDC: BigNumber,
  zapTSDAllowance: BigNumber,
  zapUSDCAllowance: BigNumber,
  zapESDAllowance: BigNumber,
  zapDSDAllowance: BigNumber,
  zapZAIAllowance: BigNumber,
  zapUSDTAllowance: BigNumber,
  accountUNIBalance: BigNumber,
  balanceTSD: BigNumber,
  balanceESD: BigNumber,
  balanceDSD: BigNumber,
  balanceZAI: BigNumber,
  balanceUSDT: BigNumber,
};

function AddUni({
                  user,
                  balanceUSDC,
                  zapTSDAllowance,
                  accountUNIBalance,
                  balanceTSD,
                  zapUSDCAllowance,
                  zapESDAllowance,
                  balanceESD,
                  zapDSDAllowance,
                  balanceDSD,
                  balanceZAI,
                  zapZAIAllowance,
                  balanceUSDT,
                  zapUSDTAllowance
                }: AddUniProps) {

  const handleBuyUniFromUSDC = (amount) => {
    buyUniV2(user, toBaseUnitBN(amount, USDC.decimals), USDC.addr)
  }

  const handleBuyUniFromTSD = (amount) => {
    buyUniV2(user, toBaseUnitBN(amount, TSD.decimals), TSD.addr)
  }

  const handleBuyUniFromESD = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, ESD.decimals), ESD.addr)
  }

  const handleBuyUniFromDSD = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, DSD.decimals), DSD.addr)
  }

  const handleBuyUniFromZAI = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, ZAI.decimals), ZAI.addr, true)
  }

  const handleBuyUniFromUSDT = (amount) => {
    buyUniV2FromProxy(user, toBaseUnitBN(amount, USDT.decimals), USDT.addr)
  }

  return (
    <Box heading="Invest in LP Pool of TSD with your USDC/TSD/ESD/DSD/ZAI">
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        <div style={{flexBasis: '32%'}}>
          <BalanceBlock asset="Balance" balance={accountUNIBalance} suffix={"UNI-V2"}/>
        </div>
        <Container>
          <ZapUni
            user={user}
            code="USDC"
            zapAllowance={zapUSDCAllowance}
            balance={balanceUSDC}
            onBuyUni={handleBuyUniFromUSDC}
            onApprove={() => approve(USDC.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="TSD"
            zapAllowance={zapTSDAllowance}
            balance={balanceTSD}
            onBuyUni={handleBuyUniFromTSD}
            onApprove={() => approveTSD(TSD.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="ESD"
            zapAllowance={zapESDAllowance}
            balance={balanceESD}
            onBuyUni={handleBuyUniFromESD}
            onApprove={() => approveESD(ESD.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="DSD"
            zapAllowance={zapDSDAllowance}
            balance={balanceDSD}
            onBuyUni={handleBuyUniFromDSD}
            onApprove={() => approveDSD(DSD.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="ZAI"
            zapAllowance={zapZAIAllowance}
            balance={balanceZAI}
            onBuyUni={handleBuyUniFromZAI}
            onApprove={() => approveZAI(ZAI.addr, ZAP.addr)}
          />

          <ZapUni
            user={user}
            code="USDT"
            zapAllowance={zapUSDTAllowance}
            balance={balanceUSDT}
            onBuyUni={handleBuyUniFromUSDT}
            onApprove={() => approveUSDT(USDT.addr, ZAP.addr)}
          />
        </Container>
      </div>
      <div style={{width: '100%', paddingTop: '2%', textAlign: 'center'}}>
        <span style={{opacity: 0.5}}>Save some gas by Zapping USDC/TSD/ESD/DSD/ZAI and invest to UNI-V2 of TSD pair with 1-click.</span>
      </div>
    </Box>
  );
}

const Container = styled.div`
  flex: 1;
  width: 100%;
  @media (max-width: 992px) {
    flex: none;
  }
`

export default AddUni;
