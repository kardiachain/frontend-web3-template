import { useState } from "react";
import Web3 from 'web3';

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3>();
  const [address, setAddress] = useState('');

  const connectKardiaChainExtension = async () => {
    if (!window.kardiachain) {
      console.log('KardiaChain extension is not installed!');
      return;
    }
    await window.kardiachain.enable()
    const web3 = new Web3(window.kardiachain)
    const [accounts] = await web3.eth.getAccounts()
    const accountsChecksum = web3.utils.toChecksumAddress(accounts)
    setAddress(accountsChecksum);
    setWeb3(web3);
  };

  const connectMetamask = async () => {
    if (!window.ethereum) {
      console.log('MetaMask is not installed!');
      return;
    }

    await window.ethereum.enable()
    const web3 = new Web3(window.ethereum)
    const [accounts] = await web3.eth.getAccounts()
    const accountsChecksum = web3.utils.toChecksumAddress(accounts)
    setAddress(accountsChecksum);
    setWeb3(web3);
  };

  return {web3, address, connectKardiaChainExtension, connectMetamask}
};
