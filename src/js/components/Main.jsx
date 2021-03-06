import React from 'react';
import { isEnabledWeb3, checkProvider } from '../infra/web3connect';
import InputDemand from './InputDemand.jsx';
import ShowDemandList from './ShowDemandList.jsx';

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value:'',
            isWeb3: isEnabledWeb3()
        };
    }
    showGUI(){
        if(!this.state.isWeb3){
            return (
                <div className="columns is-multiline">
                    <div className="column is-full">
                        <div className="content has-text-centered">
                            <div className="notification is-danger">
                                <p>Web3 is not connected</p>
                            </div>
                            <div className="notification is-warning">
                                <p>MetaMaskをインストールする必要があります。</p>
                                <p>下記リンクからダウンロードしてご利用ください。</p>
                                <a href="https://metamask.io/" className="button is-inverted is-outlined is-rounded is-warning" >https://metamask.io/</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else if(!checkProvider()){
            return (
                <div className="columns is-multiline">
                    <div className="column is-full">
                        <div className="content has-text-centered">
                            <div className="notification is-danger">
                                <p>Web3 is connected, But network is different.</p>
                            </div>
                            <div className="notification is-warning">
                                <p>当ウェブサービスはRinkebyネットで稼働中です。Rinkebyテストネットで開き直してください。</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="columns is-multiline">
                    <div className="column is-full">
                        <div className="content has-text-centered">
                            <div className="notification is-primary">
                                <p>Web3 is connected. This Network is Rinkeby</p>
                            </div>
                        </div>
                    </div>
                    <InputDemand />
                    <ShowDemandList />
                </div>
            );
        }
    }
    render(){
        return(
            <section className="section">
                {this.showGUI()}
            </section>
        )
    }
}