import React, {useEffect, useState} from 'react';
import {Modal, Button, useTheme} from '@aragon/ui';
import {useHistory} from 'react-router-dom';

function ModalAnnouncement({show, onClose}: { show: boolean, onClose: Function }) {
  const theme = useTheme();
  const history = useHistory();

  return (
    <Modal visible={show} closeButton={false}>
      <div style={{width: '100%'}}>
        <div style={{fontSize: 24, padding: 3, color: theme.warning}}>
          Announcement
        </div>

        <div style={{
          marginLeft: '3%',
          fontSize: 16,
          padding: 5
        }}>
          <div>
            <p>At Epoch 321 (81 epochs from Bootstrap end). We will do a Snapshot of coupons holders.</p>

            <p className="my-2">
              Binance Smart Chain Implementation preallocation tokens (total 3,000 $TSD tokens) will be distributed only
              for coupon holders based on % of coupons holding on total. Weight = 321/epochofCouponPurchase.
            </p>

            <p>Let's go cross-chain!!!!</p>
          </div>

        </div>

        <div style={{textAlign: 'right'}}>
          <Button
            className="mr-2"
            label={'Buy coupon'}
            onClick={()=> {
              onClose();
              history.push('/coupons/');
            }}
          />

          <Button
            label={'Ok'}
            onClick={onClose}
          />
        </div>
      </div>
    </Modal>
  );
}

export default ModalAnnouncement;
