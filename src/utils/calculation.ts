import BigNumber from 'bignumber.js';

export const SLIPPAGE = new BigNumber("0.02");

export function increaseWithSlippage(n) {
  return new BigNumber(n).multipliedBy(new BigNumber(1).plus(SLIPPAGE)).integerValue(BigNumber.ROUND_FLOOR);
}

export function decreaseWithSlippage(n) {
  return new BigNumber(n).multipliedBy(new BigNumber(1).minus(SLIPPAGE)).integerValue(BigNumber.ROUND_FLOOR);
}

export const getPriceAndBlockTimestamp = async () => {
  const response = await fetch('https://api.truedollar.finance/v1/pair-infos');
  return response.json()
}

export const calculateTwap = async (oldPrice0, oldTimestamp, price0, timestamp, targetMantissa) => {
  const timeElapsed = timestamp.minus(oldTimestamp)

  if (timeElapsed.toNumber() === 0) return 0

  const price0Average = price0.minus(oldPrice0).div(timeElapsed)

  const exchangeRate0 = price0Average
    .multipliedBy(new BigNumber(10).pow(18))
    .multipliedBy(new BigNumber(10).pow(targetMantissa))
    .div(new BigNumber(2).pow(112))

  return exchangeRate0 / 1e18;
}
