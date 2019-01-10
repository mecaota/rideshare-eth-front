import Web3 from 'web3';

/* const value */

const contractAddress = "0x2a84ef3370b247f943ed4e8c2dfaa66d3d22c560";
const contractABI = [{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"purchaser","type":"address"},{"name":"demandId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"mint_ticket","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"price","type":"uint32"},{"name":"est_date","type":"uint256"},{"name":"passengers","type":"uint8"},{"name":"dept_name","type":"string"},{"name":"dept_lat","type":"int32"},{"name":"dept_lon","type":"int32"},{"name":"arrv_name","type":"string"},{"name":"arrv_lat","type":"int32"},{"name":"arrv_lon","type":"int32"}],"name":"mint_demand","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"takeTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"payee","type":"address"}],"name":"withdrawPayments","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"demandId","type":"uint256"}],"name":"getDemandInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint32"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint8"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"from_address","type":"address"}],"name":"transferTicket","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"}],"name":"buyTicket","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"change_passengers","type":"int8"}],"name":"addremovePassengers","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"name","type":"string"},{"name":"latitude","type":"int32"},{"name":"longitude","type":"int32"}],"name":"changeArrv_spot","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"est_date","type":"uint256"}],"name":"changeEst_date","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"name","type":"string"},{"name":"latitude","type":"int32"},{"name":"longitude","type":"int32"}],"name":"changeDept_spot","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"ticketId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"changeTicketPrice","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAllDemandTokens","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"dest","type":"address"}],"name":"payments","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"DemandByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"demandId","type":"uint256"},{"name":"price","type":"uint32"}],"name":"changeDemandPrice","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalDemandSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ticketId","type":"uint256"}],"name":"getTicketInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"uint32"},{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":false,"name":"price","type":"uint256"}],"name":"BoughtTicket","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"demandId","type":"uint256"},{"indexed":false,"name":"changed","type":"string"}],"name":"ChangeDemand","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"purchaser","type":"address"},{"indexed":true,"name":"minter","type":"address"},{"indexed":true,"name":"demandId","type":"uint256"}],"name":"TicketAuthorized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];

/* local functions */

function getWeb3(){
  return window.web3;
}

function getProvider(){
  return new Web3(window.web3.currentProvider);
}

function getInstance(){
  const web3js = new Web3(window.web3.currentProvider);
  const contract = new web3js.eth.Contract(contractABI, contractAddress);
  return contract;
}

/* export functions */

export function isEnabledWeb3(){
  const web3 = getWeb3();
  if (typeof web3 !== 'undefined') {
    window.ethereum.enable();
    return true;
  } else {
    console.error("You need to install MetaMask for this app to work!");
    return false;
  }
}

export function getWeb3Event(){
  return (getWeb3().eth.getBlock("pending").transactions.length > 0);
}

export function getSelectedAddress(){
  return getProvider().currentProvider.selectedAddress;
}

export async function getDemandList(){
  const methods = getMethods();
  var result = [];
  await methods.getAllDemandTokens().call().then(
    demand_ids => {
      return Promise.all(demand_ids.map(
        demand_id => {
          return methods.getDemandInfo(demand_id).call().then(
            demand_info => {
              result.push(getShapedDemandObj(demand_info));
            }
          );
        }
      ));
    }
  );
  return result;
}

export async function getDemandOfOwner(){
  const methods = getMethods();
  //tokenOfOwnerByIndex(0)
  return methods.tokenOfOwnerByIndex(getSelectedAddress(), 0).call().then(
    demand_id => {
      return methods.getDemandInfo(demand_id).call().then(
        demand_info => {
          return getShapedDemandObj(demand_info);
        }
      );
    }
  );
}

function getShapedDemandObj2(demand){
  return {
    demand_id: demand[0],
    minter: demand[1],
    upd_date: demand[2],
    est_date: demand[3],
    price: demand[4],
    passengers: demand[5],
    name: demand[6],
    dept_latitude: demand[7],
    dept_longitude: demand[8],
    arrv_name: demand[9],
    arrv_latitude: demand[10],
    arrv_longitude: demand[11],
  };
}

function getShapedDemandObj(demand){
  return {
    demand_id: demand[0],
    minter: demand[1],
    upd_date: demand[3],
    est_date: demand[4],
    price: demand[2],
    passengers: demand[5],
    dept_name: demand[6],
    dept_latitude: demand[7],
    dept_longitude: demand[8],
    arrv_name: demand[9],
    arrv_latitude: demand[10],
    arrv_longitude: demand[11],
  };
}

export function getMethods(){
  return getInstance().methods;
}

export function getInstanceInfo(){
  const contract = getInstance();
  const methods = contract.methods;
  console.log("Web3 provider accounts:");
  console.log(contract);
  console.log(contract.givenProvider);
  console.log("networkVersion:");
  console.log(contract.givenProvider.networkVersion);
  console.log("contract methodsだす");
  console.log(methods);
  console.log("contract ownerOf");
  console.log(methods.ownerOf(getSelectedAddress()));
  //console.log("contract getAlDemandokens");
  //console.log(getDemandList());
}