import React from 'react';
import styled from 'styled-components'
import BigNumber from "bignumber.js";
import {ownership} from "../../utils/number";

type TokenDistributionProps = {
  totalBonded: BigNumber,
  totalStaged: BigNumber,
  totalRedeemable: BigNumber,
  totalSupplyUni: BigNumber,
  poolTotalBonded: BigNumber,
  poolTotalStaged: BigNumber,
};

const TokenDistribution = ({
                             totalBonded,
                             totalStaged,
                             totalRedeemable,
                             totalSupplyUni,
                             poolTotalBonded,
                             poolTotalStaged
                           }: TokenDistributionProps) => {
  const daoTotalSupply = totalBonded.plus(totalStaged).plus(totalRedeemable);

  return (
    <Container>
      <Title>Token Distribution</Title>
        <div>
          <ContainerFlex>
            <p>LP Staged:</p>
            <Space/>
            <Value>{+(ownership(poolTotalStaged, totalSupplyUni).toNumber().toFixed(2))}%</Value>
          </ContainerFlex>
          <ContainerFlex>
            <p>LP Bonded:</p>
            <Space/>
            <Value>{+(ownership(poolTotalBonded, totalSupplyUni).toNumber().toFixed(2))}%</Value>
          </ContainerFlex>
          <ContainerFlex>
            <p>DAO Staged:</p>
            <Space/>
            <Value>{+(ownership(totalStaged, daoTotalSupply).toNumber().toFixed(2))}%</Value>
          </ContainerFlex>
          <ContainerFlex>
            <p>DAO Bonded:</p>
            <Space/>
            <Value>{+(ownership(totalBonded, daoTotalSupply).toNumber().toFixed(2))}%</Value>
          </ContainerFlex>
        </div>
    </Container>
  );
};


const Container = styled.div`
  flex-basis: 50%;
  padding: 30px 50px;
  @media (max-width: 522px) {
    padding: 0;
  }
`

const ContainerFlex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
`

const Space = styled.div`
  flex: 1;
  border-bottom: 1px dotted rgb(136, 136, 136);
  margin-left: 10px;
  margin-right: 5px;
`

const Title = styled.h2`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 19px;
`

const Value = styled.h2`
  font-size: 19px;
`
export default TokenDistribution;