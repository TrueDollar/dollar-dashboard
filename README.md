# døllar dashboard
simple dashboard for interacting with the døllar protocol.

forked from [Opyn Monitor](https://opynmonitor.xyz).

## ipfs
for convenience, the current IPFS build of døllar dashboard can be accessed here: [https://truedollar.finance](https://truedollar.finance)

## screenshot
![image](https://user-images.githubusercontent.com/62496341/90950891-b2469f00-e40a-11ea-90ae-680683462d9f.png)

## prerequisites
- install [Node.js](https://nodejs.org/en/download/).

## install & run locally
```shell
git clone git@github.com:truedollar/dollar-dashboard.git
cd dollar-dashboard
npm install

npm start
```

## contracts
### mainnet
- `0x2AE21632cBcC5A2835238258B8bfb627beD139Fd` **DAO (TSDS)**
- `0xA5BE4aE152D77682B466A9F00b0Cb0dD1432820B` **Implementation**
- `0x4846239FDF4D4C1AEB26729fa064B0205acA90e1` **TSD**
- `0x465a427A3470363539C38D4af316b4A4196caEC4` **Oracle**
- `0x55b0C2EeE5d48Af6d2a65507319d20453E9f97b6` **UniswapV2 USDC:TSD Pair**
- `0x68caaD331bA8250Aef88228F87846652822AE4b5` **LP Incentivation Pool**

## disclaimer
this project is an experiment, and its contracts are unaudited - we've put a significant amount of work into testing, as well as generally de-risking the design of its core mechanism, however participants should take great caution as bugs resulting in loss of funds are always a possibility.

```
Copyright 2020 True Seigniorage Dollar Devs, based on the works of the Empty Set Squad

Licensed under the Apache License, Version 2.0 (the "License");
you may not use the included code except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
