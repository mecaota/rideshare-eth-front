import Web3 from 'web3';

/* const value */

const contractAddress = "0x0ac7d66894ea94f31e71daaa294735d9cb8d82b9";
const contractABI = [{"constant":false,"inputs":[],"name":"cleanMintedDemand","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"demand_id","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"demand_id","type":"uint256"}],"name":"getDemandInfo","outputs":[{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"uint256"},{"name":"","type":"uint32"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"},{"name":"","type":"string"},{"name":"","type":"int32"},{"name":"","type":"int32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"demand_id","type":"uint256"}],"name":"buyTicket","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"passengers","type":"uint8"},{"name":"price","type":"uint32"},{"name":"est_date","type":"uint256"},{"name":"dept_name","type":"string"},{"name":"dept_latitude","type":"int32"},{"name":"dept_longitude","type":"int32"},{"name":"arrv_name","type":"string"},{"name":"arrv_latitude","type":"int32"},{"name":"arrv_longitude","type":"int32"}],"name":"mintDemands","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"approveAllMintedTickets","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"demand_id","type":"uint256"},{"indexed":false,"name":"price","type":"uint32"}],"name":"BoughtDemand","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"demand_id","type":"uint256"},{"indexed":false,"name":"changed","type":"string"}],"name":"ChangeDemand","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"}];

const GEODOUBLE = 10000000;

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

function getMethods(){
  return getInstance().methods;
}

function getSelectedAddress(){
  return getProvider().currentProvider.selectedAddress;
}

function getTokenList(demand_ids){
  const methods = getMethods();
  return Promise.all(demand_ids.map(
    demand_id => {
      return methods.getDemandInfo(demand_id).call({from: getSelectedAddress()}).then(
        demand_info => {
          return getShapedDemandObj(demand_info, demand_id);
        },error => {
          console.log(error);
        }
      );
    }
  ));
}

function getIsOwner(demand_id){
  const methods = getMethods();
  return methods.ownerOf(demand_id).call({from: getSelectedAddress()}).then(
    owner => {
      return owner.toLowerCase() == getSelectedAddress().toLowerCase();
    }
  )
}

function isApproved(demand_id){
  const methods = getMethods();
  return methods.getApproved(demand_id).call({from: getSelectedAddress()}).then(
    approvedAddress => {
      return approvedAddress == getSelectedAddress();
    }
  );
}

function getShapedDemandObj(demand, demand_id){
  console.log(demand[5]);
  console.log(decodeURIComponent(demand[5]));
  return Promise.all([getIsOwner(demand_id), isApproved(demand_id)]).then(
    results => {
      return {
        isOwner: results[0],
        isAproved: results[1],
        isMine: demand[0],
        isPurchesed: demand[1],
        item_id: demand[2],
        demand_id: demand_id,
        price: demand[3],
        est_date: demand[4],
        dept_name: decodeURIComponent(demand[5]),
        dept_latitude: demand[6]/GEODOUBLE,
        dept_longitude: demand[7]/GEODOUBLE,
        arrv_name: decodeURIComponent(demand[8]),
        arrv_latitude: demand[9]/GEODOUBLE,
        arrv_longitude: demand[10]/GEODOUBLE,
      };
    }
  );
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

export function checkProvider(){
  return getInstance().givenProvider.networkVersion==4;
}

export function getWeb3Event(){
  return web3.eth.subscribe('pendingTransactions', function(error, result){
    if (!error){console.log(result);}
  }).on("data", transaction => console.log(transaction));
}

export function getDemandList(){
  const methods = getMethods();
  return new Promise((resolve)=>{
    resolve(methods.totalSupply().call({from: getSelectedAddress()}));
  }).then(numOfDemand => {
    return Promise.all(Array.from({length: numOfDemand}, (v, k) => k).map(
      indexOfDemand => {
        return methods.tokenByIndex(indexOfDemand).call({from: getSelectedAddress()});
      }
    ));
  }).then(demand_ids => {
    return getTokenList(demand_ids);
  });
}

export function getDemandOfOwnerList(){
  const methods = getMethods();
  return new Promise((resolve)=>{
    resolve(methods.balanceOf(getSelectedAddress()).call({from: getSelectedAddress()}));
  }).then(numOfDemand => {
    return Promise.all(Array.from({length: numOfDemand}, (v, k) => k).map(
      indexOfDemand => {
        return methods.tokenOfOwnerByIndex(getSelectedAddress(), indexOfDemand).call({from: getSelectedAddress()});
      }
    ));
  }).then(demand_ids => {
    return getTokenList(demand_ids);
  });
}

export function burnMintedDemand(){
  const methods = getMethods();
  return methods.cleanMintedDemand().send({from: getSelectedAddress()}).then(
    receipt => console.log(receipt), error => console.log(error)
  );
}

export function burn(demand_id){
  const methods = getMethods();
  return methods.burn(demand_id).call({from: getSelectedAddress()}).then(
    result => console.log(result), error => console.log(error)
  );
}

export function buyTicket(demand_id){
  const methods = getMethods();
  return methods.buyTicket(demand_id).send({from: getSelectedAddress()}).then(
    result => console.log(result), error => console.log(error)
  );
}

export function approveAllMintedTickets(){
  const methods = getMethods();
  return methods.approveAllMintedTickets().send({from: getSelectedAddress()}).then(
    result => console.log(result), error => console.log(error)
  );
}

export function authorizeDemand(demand_id){
  const methods = getMethods();
  return methods.ownerOf(demand_id).call({from: getSelectedAddress()}).then(
    owner => {
      methods.safeTransferFrom(selectedAddress(), owner, demand_id).call({from: getSelectedAddress()}).then(
        result => console.log(result), error => console.log(error)
      );
    }
  )
}

export function mintDemands(
  passengers,
  price,
  est_date,
  dept_name,
  dept_latitude,
  dept_longitude,
  arrv_name,
  arrv_latitude,
  arrv_longitude
){
  const methods = getMethods();
  console.log(dept_name);
  console.log(encodeURIComponent(dept_name));
  return methods.mintDemands(
    passengers,
    price,
    est_date,
    encodeURIComponent(dept_name),
    Math.round(dept_latitude*GEODOUBLE),
    Math.round(dept_longitude*GEODOUBLE),
    encodeURIComponent(arrv_name),
    Math.round(arrv_latitude*GEODOUBLE),
    Math.round(arrv_longitude*GEODOUBLE)
  ).send({from: getSelectedAddress()}).then(
    receipt => console.log(receipt), error => console.log(error)
  );
}