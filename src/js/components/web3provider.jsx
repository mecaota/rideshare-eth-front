import React from 'react';
import * as eth from '../infra/web3connect'

export default class Web3Provider extends React.Component {
  constructor(props) {
    super(props);
    eth.setupWeb3();
    this.state = {
      web3: window.web3,
      blockNumber: eth.getBlockNumber(),
      message: eth.getMessage()
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