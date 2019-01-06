import React from 'react';
import { eth, getInstance, isEnabledWeb3 } from '../infra/web3connect'
import Input from './Input.jsx'

  export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            isWeb3: isEnabledWeb3()
        };
    }

    showInstance(){
        console.log(this.state.isWeb3);
        if(isEnabledWeb3()){
            var contract = getInstance();
            console.log("Instance object");
            console.log(contract.methods.getAllDemandTokens().call());
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

    render(){
        return(
            <section className="section">
                <div className="columns">
                    <div className="column">
                        <div className="content">
                            <p>{this.showInstance()}</p>
                        </div>
                    </div>
                </div>
                <Input />
            </section>
        )
    }
}