import React, {useEffect, useState} from 'react';

import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import {Main, Layout} from '@aragon/ui';
import {UseWalletProvider} from 'use-wallet';
import {updateModalMode} from './utils/web3';
import {storePreference, getPreference} from './utils/storage';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Trade from './components/Trade/index';
import Footer from './components/Footer';
import Wallet from "./components/Wallet";
import EpochDetail from "./components/EpochDetail";
import CouponMarket from "./components/CouponMarket";
import Governance from "./components/Governance";
import Candidate from "./components/Candidate";
import Regulation from "./components/Regulation";
import Pool from "./components/Pool";
import HomePageNoWeb3 from "./components/HomePageNoWeb3";
import About from "./components/About";
import Tool from "./components/Tool";
// import GetUni from "./components/GetUni";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const storedTheme = getPreference('theme', 'light');

  const [hasWeb3, setHasWeb3] = useState(false);
  const [user, setUser] = useState(''); // the current connected user
  const [theme, setTheme] = useState(storedTheme);
  const updateTheme = (newTheme: string) => {
    setTheme(newTheme);
    updateModalMode(newTheme);
    storePreference('theme', newTheme);
  };

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        // @ts-ignore
        setHasWeb3(typeof window.ethereum !== 'undefined');
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);

    // eslint-disable-next-line consistent-return
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <Router>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: 'https://mainnet.eth.aragon.network/' },
          walletlink: {
            url: 'https://mainnet.eth.aragon.network/',
            appName:'Coinbase Wallet',
            appLogoUrl: ''
          }
        }}
      >
        <Main assetsUrl={`${process.env.PUBLIC_URL}/aragon-ui/`} theme={theme} layout={false}>
          <NavBar hasWeb3={hasWeb3} user={user} setUser={setUser} />
          {
            hasWeb3 ?
                  <Switch>
                    <Route path="/dao/:override">
                      <Layout style={{ minWidth: 'auto' }}><Wallet user={user}/>
                      </Layout>
                      </Route>
                    <Route path="/dao/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <Wallet user={user}/>
                      </Layout></Route>
                    {/*<Route path="/get-uni/"><GetUni user={user}/></Route>*/}
                    <Route path="/epoch/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <EpochDetail user={user}/>
                      </Layout></Route>
                    <Route path="/coupons/:override">
                      <Layout style={{ minWidth: 'auto' }}>
                        <CouponMarket user={user}/>
                      </Layout>
                      </Route>
                    <Route path="/coupons/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <CouponMarket user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/governance/candidate/:candidate">
                      <Layout style={{ minWidth: 'auto' }}><Candidate user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/governance/">
                      <Layout style={{ minWidth: 'auto' }}><Governance user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/trade/">
                      <Layout style={{ minWidth: 'auto' }}><Trade user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/regulation/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <Regulation user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/pool/:override">
                      <Layout style={{ minWidth: 'auto' }}>
                        <Pool user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/pool/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <Pool user={user}/>
                      </Layout>
                    </Route>
                    <Route path="/about/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <About/>
                      </Layout></Route>
                    <Route path="/tools/">
                      <Layout style={{ minWidth: 'auto' }}>
                        <Tool/>
                      </Layout></Route>
                    <Route path="/"><HomePage user={user}/></Route>
                  </Switch>
              :

            <Layout>
                <Switch>
                  <Route path="/"><HomePageNoWeb3/></Route>
                </Switch>
            </Layout>
          }
          <div style={{height: '128px', width: '100%'}}/>
          <Footer hasWeb3={hasWeb3} theme={theme} updateTheme={updateTheme}/>
        </Main>
      </UseWalletProvider>
    </Router>
  );
}

export default App;
