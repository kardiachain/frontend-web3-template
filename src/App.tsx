import BigNumber from 'bignumber.js';
import React, { useMemo, useState } from 'react';
import { useWeb3 } from './hook/useWeb3';
import { formatNumberString } from './util/string';

function App() {
  const {address, connectKardiaChainExtension, web3 , connectMetamask} = useWeb3();

  const [balance, setBalance] = useState('');

  const handleGetBalance = async () => {
    if (!web3) return;
    const rs = await web3.eth.getBalance(address);
    setBalance(rs);
  };

  const parsedBalance = useMemo(() => {
    if (balance === '') return '';
    const balanceInKAI = new BigNumber(balance).dividedBy(10 ** 18).toFixed();
    return `${formatNumberString({numberString: balanceInKAI, suffix: ' KAI'})}`;
  }, [balance]);

  const handleConnect = (extension: 'KardiaChain' | 'Metamask') => {
    setBalance('');
    if (extension === 'KardiaChain') {
      connectKardiaChainExtension();
    } else {
      connectMetamask();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Web3 template to work with KardiaChain</h1>
      <div>
        <button style={{marginRight: 8}} onClick={() => handleConnect('KardiaChain')}>Connect using KardiaChain extension</button>
        <button onClick={() => handleConnect('Metamask')}>Connect using Metamask</button>
      </div>
      {address !== '' && (
        <>
          <div style={{marginTop: 20}}>Connected address: {address}</div>
          <h4>Balance: {parsedBalance}</h4>
          <button onClick={handleGetBalance}>Get KAI balance</button>
        </>
      )}
    </div>
  );
}

export default App;
