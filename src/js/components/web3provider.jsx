import React from 'react';
import * as Web3 from 'web3';
//import * as eth from '../infra/web3connect'

const contractAddress = "0x6b74d9f03b5ed4f6550e07473bed173d118bad70";
const contractABI = [{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"change_passengers","type":"int8"}],"name":"addremovePassengers","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"}],"name":"buyTicket","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"name","type":"string"},{"name":"latitude","type":"int32"},{"name":"longitude","type":"int32"}],"name":"changeArrv_spot","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"changeDemandPrice","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"name","type":"string"},{"name":"latitude","type":"int32"},{"name":"longitude","type":"int32"}],"name":"changeDept_spot","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"est_date","type":"uint256"}],"name":"changeEst_date","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"changeTicketPrice","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint32"},{"name":"est_date","type":"uint256"},{"name":"passengers","type":"uint8"},{"name":"dept_name","type":"string"},{"name":"dept_lat","type":"int32"},{"name":"dept_lon","type":"int32"},{"name":"arrv_name","type":"string"},{"name":"arrv_lat","type":"int32"},{"name":"arrv_lon","type":"int32"}],"name":"mint_demand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"purchaser","type":"address"},{"name":"demandId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"mint_ticket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"takeTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"from_address","type":"address"}],"name":"transferTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"payee","type":"address"}],"name":"withdrawPayments","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name":"BoughtTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"demandId","type":"uint256"},{"indexed":false,"name":"changed","type":"string"}],"name":"ChangeDemand","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"minter","type":"address"},{"indexed":true,"name":"demandId","type":"uint256"}],"name":"TicketAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"DemandByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllDemandTokens","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"demandId","type":"uint256"}],"name":"getDemandInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint32"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"dest","type":"address"}],"name":"payments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalDemandSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}]

export default class Web3Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="">
        <div>
          <p>web3 available</p>
          <p>{web3 !== undefined ? 'yes' : 'no'}</p>
        </div>
        <div>
          <p>account available</p>
          <p>{web3.eth.accounts !== undefined ? 'yes' : 'no'}</p>
        </div>
        <div>
          <p>BlockNumber: {this.state.blockNumber}</p>
          <p>Message: {this.state.message}</p>
        </div>
      </div>
    );
  }
}

export function setupWeb3() {
  if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  }
}

export function setupDefaultAccount() {
  return new Promise((resolve, reject) => {
    window.web3.eth.getAccounts((err, accounts) => {
      if (err) {
        reject(err);
        return;
      }
      window.web3.eth.defaultAccount = accounts[0];
      resolve();
    });
  });
}

export function fromUtf8(str) {
  return window.web3.fromUtf8(str);
}

export function toUtf8(hex) {
  return window.web3.toUtf8(hex);
}

export function getNetwork() {
  const web3 = window.web3;
  return new Promise((resolve, reject) => {
    web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
      switch (netId) {
        case '1':
          resolve('Mainnet');
          break;
        case '2':
          resolve('Morden');
          break;
        case '3':
          resolve('Ropsten');
          break;
        case '4':
          resolve('Rinkeby');
          break;
        case '42':
          resolve('Kovan');
          break;
        default:
          resolve('Unknown');
          break;
      }
    });
  });
}

export function getBlockNumber() {
  const web3 = window.web3;
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, blockNumber) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(blockNumber);
    });
  });
}

export function setOnAccountChange(callback) {
  const web3 = window.web3;
  let account = web3.eth.accounts[0];
  return setInterval(function() {
    if (web3.eth.accounts[0] !== account) {
      account = web3.eth.accounts[0];
    }
  }, 100);
}

export function getInstance() {
    const web3 = window.web3;
    const contract = web3.eth.contract(contractABI);
    const instance = contract.at(contractAddress);
    return instance;
  }
  
  export function getMessage() {
    const instance = getInstance();
    return new Promise((resolve, reject) => {
      instance.message((err, message) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(message);
      });
    });
  }
  
  export async function setMessage(message) {
    await setupDefaultAccount();
    const instance = getInstance();
    return new Promise((resolve, reject) => {
      instance.setMessage(message, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }

function test_metamask(){
    window.addEventListener('load', async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
                // Request account access if needed
                await ethereum.enable();
                // Acccounts now exposed
                web3.eth.sendTransaction({/* ... */});
            } catch (error) {
                // User denied account access...
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider);
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */});
        }
        // Non-dapp browsers...
        else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            window.alert('Ethereumブラウザープラグインを確認できません。Metamask等Ethereumプラグインをインストールしてご利用ください。');
        }
        });
        console.log(web3);
  }