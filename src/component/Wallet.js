import React, { useState } from 'react';
import {ethers} from 'ethers'


const WalletCart = () => {
    const [defultAddress, setDefultAddress] = useState(null);
    const [defultBalace, setDefultBalace ] = useState(null);
    const [connectButton,setConnectButton] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const handleChange = () => {
     if(window.ethereum) {
      window.ethereum.request({method : 'eth_requestAccounts'})
      .then(result=> {
          changeAccounthandler(result[0])
      })
     }else{
         setErrorMsg('metamask installed');
    }
}

const changeAccounthandler = (newAccount) => {
 setDefultAddress(newAccount);
 getUserbalance(newAccount.toString())
}

const getUserbalance = (account) => {
    window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
    .then(balance => {
        setDefultBalace(ethers.utils.formatEther(balance));
    })

}
window.ethereum.on('accountChanged',  changeAccounthandler );
    return(
        <div className='Wallatcart'>
            <h3>Connnected with meta mask</h3>
            <button onClick={handleChange}>{connectButton}</button>
            <div className='account_connect'>
                <h3> Account: {defultAddress}</h3>
            </div>

            <div className='balance_connect'>
                <h3> Balance: {defultBalace}</h3>
            </div>

  {errorMsg}
        </div>
    )
}

export default WalletCart