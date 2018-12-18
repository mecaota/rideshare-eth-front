import React from 'react';
import { eth, getInstance, isEnabledWeb3 } from '../infra/web3connect'

export function showInstance(){
    if(isEnabledWeb3()){
        getInstance();
        return (
            <div className="notification is-primary">
                <p>Web3 is connected. Watch your console</p>
            </div>
        );
    }else{
        return (
            <div className="notification is-danger">
                <p>You need to install MetaMask for this app to work!</p>
            </div>
        );
    }
  }

  export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {value:''};
    }
    render(){
        return(
            <section className="section">
                <div className="content">
                    <p>{showInstance()}</p>
                </div>
            </section>
        )
    }
}