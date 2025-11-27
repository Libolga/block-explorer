import { useState, useEffect } from "react";
import { ethers } from "ethers";

const vmContractAddress = "0x5e16FB1784abd2a33ca84D259AcE9e1cAE55416c";
const abi = [
  "function symbol() view returns (string)",
  "function getVendingMachineBalance() view returns (uint)",
  "function balanceOf(address addr) view returns (uint)",
  "function purchase(uint amount) payable"
];

function VendingMachine({ provider }) {
  const [address, setAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [cupsInMachine, setCupsInMachine] = useState(0);
  const [purchaseCups, setPurchaseCups] = useState("");
  const [accountCups, setAccountCups] = useState(0);

  useEffect(() => {
    async function updateVendingMachineState() {
      const contract = new ethers.Contract(vmContractAddress, abi, provider);
      try {
        const symbol = await contract.symbol();
        setSymbol(symbol);
        
        const cupsInMachine = await contract.getVendingMachineBalance();
        setCupsInMachine(cupsInMachine.toString());
      } catch (error) {
        console.error("Error fetching contract data:", error);
      }
    }
    updateVendingMachineState();
  }, []);

  async function checkBalance() {
    if (!address) return;
    const contract = new ethers.Contract(vmContractAddress, abi, provider);
    try {
      const balance = await contract.balanceOf(address);
      setAccountCups(balance.toString());
    } catch (error) {
      console.error("Error checking balance:", error);
    }
  }

  return (
    <div className="container">
      <h2>Vending Machine</h2>
      <div className="balance">TOTAL: {cupsInMachine} {symbol}</div>
      
      <div className="contract-interaction">
        <label>
          Check Your Balance:
          <input 
            placeholder="Your address (0x...)" 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <button onClick={checkBalance}>Check Balance</button>
        {accountCups > 0 && <p>Your Cups: {accountCups}</p>}
      </div>
    </div>
  );
}

export default VendingMachine;
