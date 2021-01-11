import React from 'react';
import { Form } from 'react-bootstrap';
import './style.scss';

type switchThemeProps = {
  hasWeb3: boolean,
  theme: string,
  updateTheme: Function
}

function SwitchMode({ hasWeb3, theme, updateTheme }: switchThemeProps) {
  const handleChangeTheme = () => {
    if (theme === 'light') updateTheme('dark');
    else updateTheme('light');
  };

  return (
    <>
    <Form.Switch
      className="custom-switch"
      type="switch"
      id={`custom-switch`}
      label=""
      checked={theme === 'dark'}
      disabled={!hasWeb3}
      onChange={handleChangeTheme}
    />
    {/*<Button*/}
    {/*  icon={theme === 'dark' ? <IconStar /> : <IconStarFilled />}*/}
    {/*  onClick={handleChangeTheme}*/}
    {/*  label=""*/}
    {/*  disabled={!hasWeb3}*/}
    {/*/*/}
    </>
  );
}

export default SwitchMode;
