import React from 'react';
import { UNISWAP_TRADE} from "../../constants/contracts";

const Buy = ({user}: {user:string}) => {
  return (
    <div className="mt-4">
      <iframe
        src="https://app.uniswap.org/#/swap?inputCurrency=0x00&outputCurrency=0x4846239FDF4D4C1AEB26729fa064B0205acA90e1"
        height="700"
        width="100%"
        id="myId"
      />
    </div>
  );
};

export default Buy;