import { ethers } from "ethers";
import './App.css'
import BalanceReader from './components/BalanceReader';
import BlockExplorer from './components/BlockExplorer';
import VendingMachine from './components/VendingMachine';

const providerUrl = "https://ethereum-sepolia-rpc.publicnode.com";
const provider = new ethers.JsonRpcProvider(providerUrl);

function App() {
  return (
    <div className="app">
      <h1>Ethereum Block Explorer</h1>
      <BalanceReader provider={provider} />
      <BlockExplorer provider={provider} />
      <VendingMachine provider={provider} />
    </div>
  )
}

export default App
