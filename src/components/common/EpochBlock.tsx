import React from 'react';
import { useHistory } from 'react-router-dom';

type EpochBlockProps = {
  epoch: string,
  epochCurrent: number,
  epochAvailable: number,
}

function EpochBlock({epoch,epochCurrent,epochAvailable}: EpochBlockProps) {
  const history = useHistory();
  return (
    <>
      <div style={{fontSize: 16, padding: 3}}>Epoch</div>
      <div style={{
        fontSize: 30,
        padding: 3,
        fontWeight: 'bold',
        lineHeight: 1.5,
        fontFamily: 'aragon-ui-monospace, monospace'
      }}>{epochCurrent}-{epoch}</div>
      <div
        style={{fontSize: 16, padding: 3, cursor: 'pointer'}}
        onClick={() => history.push('/epoch/')}
      >Advance -&gt; {epochAvailable}</div>
    </>
  );
}

export default EpochBlock;
