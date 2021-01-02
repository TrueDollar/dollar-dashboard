import React, {ReactNode} from 'react';
import {LinkBase} from '@aragon/ui';
import {Dropdown, FormControl} from "react-bootstrap";

import './style.css'

type MenuProps = {
  history: any,
  page: string
}


const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any)=> (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));

const Menu = ({history, page}: MenuProps) => {
  return (
    <>
      <LinkButton title="DAO" onClick={() => history.push('/dao/')} isSelected={page.includes('/dao')}/>
      <LinkButton title="Liquidity" onClick={() => history.push('/pool/')} isSelected={page.includes('/pool')}/>
      <LinkButton title="Regulation" onClick={() => history.push('/regulation/')}
                  isSelected={page.includes('/regulation')}/>
      <LinkButton title="Governance" onClick={() => history.push('/governance/')}
                  isSelected={page.includes('/governance')}/>
      <LinkButton title="Trade" onClick={() => history.push('/trade/')} isSelected={page.includes('/trade')}/>
      <LinkButton title="Coupons" onClick={() => history.push('/coupons/')} isSelected={page.includes('/coupons')}/>
      <LinkButton title="Epoch" onClick={() => history.push('/epoch/')} isSelected={page.includes('/epoch')}/>
      <Dropdown
        style={{
          cursor: 'pointer',
          display: 'inline-block'
        }}
      >
        <Dropdown.Toggle
          id="dropdown-basic"
          as={CustomToggle}
        >
          <div style={{marginLeft: '8px', marginRight: '8px', height: '40px'}}>
            <div  style={{padding: '1%', opacity: 0.5, fontSize: 17}}><span className="btn-more">More</span></div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item className="btn-default" onClick={() => history.push('/about/')}>About</Dropdown.Item>
          <Dropdown.Item className="btn-default" href="http://docs.truedollar.finance/">FAQs</Dropdown.Item>
          <Dropdown.Item className="btn-default" href="https://trueseigniorage.medium.com/">News</Dropdown.Item>
          <Dropdown.Item className="btn-default" onClick={() => history.push('/tool/')}>Tools</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

type linkButtonProps = {
  title: string,
  onClick: Function,
  isSelected?: boolean
}

function LinkButton({title, onClick, isSelected = false}: linkButtonProps) {
  return (
    <LinkBase onClick={onClick} style={{marginLeft: '8px', marginRight: '8px', height: '40px'}}>
      <div style={{padding: '1%', opacity: isSelected ? 1 : 0.5, fontSize: 17}}>{title}</div>
    </LinkBase>
  );
}

export default Menu;