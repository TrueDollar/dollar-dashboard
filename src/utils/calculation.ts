import BigNumber from 'bignumber.js';

export const SLIPPAGE = new BigNumber("0.02");

export function increaseWithSlippage(n) {
  return new BigNumber(n).multipliedBy(new BigNumber(1).plus(SLIPPAGE)).integerValue(BigNumber.ROUND_FLOOR);
}

export function decreaseWithSlippage(n) {
  return new BigNumber(n).multipliedBy(new BigNumber(1).minus(SLIPPAGE)).integerValue(BigNumber.ROUND_FLOOR);
}

export const getPriceAndBlockTimestamp = async () => {
  try {
    const response = await fetch('https://truedollar.finance/v1/pair-infos');
    return response.json()
  } catch (e) {
    return {
      "success": true,
      "payload": [{
        "reserves": {
          "_reserve0": 3.083141671301828e+24,
          "_reserve1": 488266249781,
          "_blockTimestampLast": 1610376140
        },
        "_id": "5ffc67f09406ce5e5b0025db",
        "price0CumulativeLast": 3.314415126428786e+29,
        "trackingTime": 1610377200525,
        "createdAt": "2021-01-11T15:00:00.533Z",
        "updatedAt": "2021-01-11T15:00:00.533Z"
      }, {
        "reserves": {
          "_reserve0": 3.087290973064644e+24,
          "_reserve1": 487590664395,
          "_blockTimestampLast": 1610373484
        },
        "_id": "5ffc59e09406ce5e5b0025da",
        "price0CumulativeLast": 3.3143935904713e+29,
        "trackingTime": 1610373600528,
        "createdAt": "2021-01-11T14:00:00.536Z",
        "updatedAt": "2021-01-11T14:00:00.536Z"
      }, {
        "reserves": {
          "_reserve0": 2.972763443435389e+24,
          "_reserve1": 521934532962,
          "_blockTimestampLast": 1610369080
        },
        "_id": "5ffc4bd09406ce5e5b0025d9",
        "price0CumulativeLast": 3.3143550389492e+29,
        "trackingTime": 1610370000517,
        "createdAt": "2021-01-11T13:00:00.525Z",
        "updatedAt": "2021-01-11T13:00:00.525Z"
      }, {
        "reserves": {
          "_reserve0": 2.7114258140279274e+24,
          "_reserve1": 577524669644,
          "_blockTimestampLast": 1610365820
        },
        "_id": "5ffc3ebe9406ce5e5b0025d8",
        "price0CumulativeLast": 3.3143234316581094e+29,
        "trackingTime": 1610366654613,
        "createdAt": "2021-01-11T12:04:14.622Z",
        "updatedAt": "2021-01-11T12:04:14.622Z"
      }, {
        "reserves": {
          "_reserve0": 2.668430083303573e+24,
          "_reserve1": 593247649538,
          "_blockTimestampLast": 1610362604
        },
        "_id": "5ffc2fb09406ce5e5b0025d7",
        "price0CumulativeLast": 3.3142867947563055e+29,
        "trackingTime": 1610362800522,
        "createdAt": "2021-01-11T11:00:00.531Z",
        "updatedAt": "2021-01-11T11:00:00.531Z"
      }, {
        "reserves": {
          "_reserve0": 2.678694846987673e+24,
          "_reserve1": 595866234068,
          "_blockTimestampLast": 1610358650
        },
        "_id": "5ffc21a09406ce5e5b0025d6",
        "price0CumulativeLast": 3.314240746490205e+29,
        "trackingTime": 1610359200548,
        "createdAt": "2021-01-11T10:00:00.556Z",
        "updatedAt": "2021-01-11T10:00:00.556Z"
      }, {
        "reserves": {
          "_reserve0": 2.702487653684463e+24,
          "_reserve1": 600000124453,
          "_blockTimestampLast": 1610355428
        },
        "_id": "5ffc13939406ce5e5b0025d5",
        "price0CumulativeLast": 3.3142034961723594e+29,
        "trackingTime": 1610355603562,
        "createdAt": "2021-01-11T09:00:03.571Z",
        "updatedAt": "2021-01-11T09:00:03.571Z"
      }, {
        "reserves": {
          "_reserve0": 2.552371949891324e+24,
          "_reserve1": 647696477094,
          "_blockTimestampLast": 1610351852
        },
        "_id": "5ffc05801cf2351225cd6a9f",
        "price0CumulativeLast": 3.314159196581033e+29,
        "trackingTime": 1610352000506,
        "createdAt": "2021-01-11T08:00:00.512Z",
        "updatedAt": "2021-01-11T08:00:00.512Z"
      }, {
        "reserves": {
          "_reserve0": 2.4780630082961153e+24,
          "_reserve1": 668131099876,
          "_blockTimestampLast": 1610348358
        },
        "_id": "5ffbf7701cf2351225cd6a9e",
        "price0CumulativeLast": 3.3141128045658355e+29,
        "trackingTime": 1610348400527,
        "createdAt": "2021-01-11T07:00:00.533Z",
        "updatedAt": "2021-01-11T07:00:00.533Z"
      }, {
        "reserves": {
          "_reserve0": 2.4631839991071613e+24,
          "_reserve1": 675427683607,
          "_blockTimestampLast": 1610344447
        },
        "_id": "5ffbe9611cf2351225cd6a9d",
        "price0CumulativeLast": 3.314057770032003e+29,
        "trackingTime": 1610344801256,
        "createdAt": "2021-01-11T06:00:01.261Z",
        "updatedAt": "2021-01-11T06:00:01.261Z"
      }, {
        "reserves": {
          "_reserve0": 2.4011112108162927e+24,
          "_reserve1": 695450219011,
          "_blockTimestampLast": 1610340947
        },
        "_id": "5ffbdb511cf2351225cd6a9c",
        "price0CumulativeLast": 3.314006007534358e+29,
        "trackingTime": 1610341201341,
        "createdAt": "2021-01-11T05:00:01.352Z",
        "updatedAt": "2021-01-11T05:00:01.352Z"
      }, {
        "reserves": {
          "_reserve0": 2.3127113679443172e+24,
          "_reserve1": 722522152203,
          "_blockTimestampLast": 1610335724
        },
        "_id": "5ffbcd4347b01d796c34282e",
        "price0CumulativeLast": 3.313922449000112e+29,
        "trackingTime": 1610337603337,
        "createdAt": "2021-01-11T04:00:03.347Z",
        "updatedAt": "2021-01-11T04:00:03.347Z"
      }, {
        "reserves": {
          "_reserve0": 2.3042265599261538e+24,
          "_reserve1": 725807547792,
          "_blockTimestampLast": 1610332478
        },
        "_id": "5ffbbf3047b01d796c34282d",
        "price0CumulativeLast": 3.313869499271298e+29,
        "trackingTime": 1610334000514,
        "createdAt": "2021-01-11T03:00:00.519Z",
        "updatedAt": "2021-01-11T03:00:00.519Z"
      }, {
        "reserves": {
          "_reserve0": 2.289083068568326e+24,
          "_reserve1": 725122424140,
          "_blockTimestampLast": 1610329977
        },
        "_id": "5ffbb12047b01d796c34282c",
        "price0CumulativeLast": 3.313828471246971e+29,
        "trackingTime": 1610330400535,
        "createdAt": "2021-01-11T02:00:00.540Z",
        "updatedAt": "2021-01-11T02:00:00.540Z"
      }, {
        "reserves": {
          "_reserve0": 2.259731164450521e+24,
          "_reserve1": 733784998090,
          "_blockTimestampLast": 1610326649
        },
        "_id": "5ffba31047b01d796c34282b",
        "price0CumulativeLast": 3.3137732370049894e+29,
        "trackingTime": 1610326800520,
        "createdAt": "2021-01-11T01:00:00.526Z",
        "updatedAt": "2021-01-11T01:00:00.526Z"
      }, {
        "reserves": {
          "_reserve0": 2.135761968470829e+24,
          "_reserve1": 838794091481,
          "_blockTimestampLast": 1610322751
        },
        "_id": "5ffb950047b01d796c34282a",
        "price0CumulativeLast": 3.313704259646373e+29,
        "trackingTime": 1610323200514,
        "createdAt": "2021-01-11T00:00:00.520Z",
        "updatedAt": "2021-01-11T00:00:00.520Z"
      }, {
        "reserves": {
          "_reserve0": 2.0253970490915494e+24,
          "_reserve1": 866909003511,
          "_blockTimestampLast": 1610319556
        },
        "_id": "5ffb86f047b01d796c342829",
        "price0CumulativeLast": 3.313636124743752e+29,
        "trackingTime": 1610319600508,
        "createdAt": "2021-01-10T23:00:00.515Z",
        "updatedAt": "2021-01-10T23:00:00.515Z"
      }, {
        "reserves": {
          "_reserve0": 1.9551257580055236e+24,
          "_reserve1": 898671242768,
          "_blockTimestampLast": 1610315798
        },
        "_id": "5ffb78e047b01d796c342828",
        "price0CumulativeLast": 3.313551519819284e+29,
        "trackingTime": 1610316000525,
        "createdAt": "2021-01-10T22:00:00.531Z",
        "updatedAt": "2021-01-10T22:00:00.531Z"
      }, {
        "reserves": {
          "_reserve0": 1.8064157989599344e+24,
          "_reserve1": 931353067358,
          "_blockTimestampLast": 1610312043
        },
        "_id": "5ffb6ad047b01d796c342827",
        "price0CumulativeLast": 3.313456465378007e+29,
        "trackingTime": 1610312400509,
        "createdAt": "2021-01-10T21:00:00.515Z",
        "updatedAt": "2021-01-10T21:00:00.515Z"
      }, {
        "reserves": {
          "_reserve0": 1.767914613003001e+24,
          "_reserve1": 946526824306,
          "_blockTimestampLast": 1610308794
        },
        "_id": "5ffb5cc047b01d796c342826",
        "price0CumulativeLast": 3.313368262591411e+29,
        "trackingTime": 1610308800515,
        "createdAt": "2021-01-10T20:00:00.520Z",
        "updatedAt": "2021-01-10T20:00:00.520Z"
      }, {
        "reserves": {
          "_reserve0": 1.6689155760100953e+24,
          "_reserve1": 994589852383,
          "_blockTimestampLast": 1610305139
        },
        "_id": "5ffb4eb047b01d796c342825",
        "price0CumulativeLast": 3.31326500369714e+29,
        "trackingTime": 1610305200523,
        "createdAt": "2021-01-10T19:00:00.524Z",
        "updatedAt": "2021-01-10T19:00:00.524Z"
      }, {
        "reserves": {
          "_reserve0": 1.4745480523241307e+24,
          "_reserve1": 1013916474743,
          "_blockTimestampLast": 1610301200
        },
        "_id": "5ffb40a047b01d796c342824",
        "price0CumulativeLast": 3.313136676437201e+29,
        "trackingTime": 1610301600499,
        "createdAt": "2021-01-10T18:00:00.500Z",
        "updatedAt": "2021-01-10T18:00:00.500Z"
      }, {
        "reserves": {
          "_reserve0": 1.4334172281404627e+24,
          "_reserve1": 1034122428584,
          "_blockTimestampLast": 1610297119
        },
        "_id": "5ffb329047b01d796c342823",
        "price0CumulativeLast": 3.312986723562548e+29,
        "trackingTime": 1610298000495,
        "createdAt": "2021-01-10T17:00:00.496Z",
        "updatedAt": "2021-01-10T17:00:00.496Z"
      }, {
        "reserves": {
          "_reserve0": 1.4024628634960533e+24,
          "_reserve1": 1038941439793,
          "_blockTimestampLast": 1610294339
        },
        "_id": "5ffb248147b01d796c342822",
        "price0CumulativeLast": 3.312880703836522e+29,
        "trackingTime": 1610294401230,
        "createdAt": "2021-01-10T16:00:01.235Z",
        "updatedAt": "2021-01-10T16:00:01.235Z"
      }, {
        "reserves": {
          "_reserve0": 1.38800217984868e+24,
          "_reserve1": 1028535100453,
          "_blockTimestampLast": 1610291472
        },
        "_id": "5ffb1b471de45177a712cfaa",
        "price0CumulativeLast": 3.31277032294724e+29,
        "createdAt": "2021-01-10T15:20:39.946Z",
        "updatedAt": "2021-01-10T15:20:39.946Z",
        "trackingTime": 1610292886034
      }]
    }
  }
}

export const calculateTwap = async (oldPrice0, oldTimestamp, price0, timestamp, targetMantissa, pairInfo) => {
  const timeElapsed = timestamp.minus(oldTimestamp)

  if (timeElapsed.toNumber() === 0) return 0

  const price0Average = price0.minus(oldPrice0).div(timeElapsed)

  const exchangeRate0 = price0Average
    .multipliedBy(new BigNumber(10).pow(18))
    .multipliedBy(new BigNumber(10).pow(targetMantissa))
    .div(new BigNumber(2).pow(112))

  let twap = exchangeRate0 / 1e18;

  if (true){
    for (let i = 1; i < pairInfo.length; i++){
      const {price0CumulativeLast, reserves} = pairInfo[i];
      const oldPrice = new BigNumber(price0CumulativeLast);
      const oldTimestamp = new BigNumber(reserves?._blockTimestampLast);
      const timeElapsed = timestamp.minus(oldTimestamp)

      if (timeElapsed.toNumber() === 0) return 0

      const price0Average = price0.minus(oldPrice).div(timeElapsed)

      const exchangeRate0 = price0Average
        .multipliedBy(new BigNumber(10).pow(18))
        .multipliedBy(new BigNumber(10).pow(targetMantissa))
        .div(new BigNumber(2).pow(112))

      const twapOld = exchangeRate0 / 1e18;

      if (twapOld > 0) {
        twap = twapOld
        break;
      }
    }
  }

  return twap;
}
