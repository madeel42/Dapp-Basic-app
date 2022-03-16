import logo from "./logo.svg";
import { useState } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
// import "./App.css";
import { ethers } from "ethers";
const greeterAddress = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

function App() {
  const [greeting, setGreetingValue] = useState('');
  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
   
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider,'provider')
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);
      try {
        const data = await contract.greet();
        console.log('data=',data)
      } catch (err) {
        console.log("Error-->", err);
      }
    }
  };
  const setGreetings = async () => {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     
      const signer =  provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreetings(greeting);
      setGreetingValue('')
      await transaction.wait();
      fetchGreeting()
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        
        <button onClick={fetchGreeting}>fetch greeting</button>
        <button onClick={setGreetings}>set greeting</button>
        <input type="text" value={greeting} onChange={e => setGreetingValue(e.target.value)} placeholder='set greeting' name="" id="" />
      </header>
    </div>
  );
}

export default App;
