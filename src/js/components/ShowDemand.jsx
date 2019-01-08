import React from 'react';
import { eth, getMethods, getInstanceInfo, getDemandList, getSelectedAddress } from '../infra/web3connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var moment = require('moment');

class DemandInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log(this.props.demand);
        this.props.methods.buyTicket(this.props.demand[0]).send(
            {from: getSelectedAddress()}
        ).then(
            receipt =>{
                console.log(receipt);
            }
        );
    }
    render(){
        return(
            <div className="column is-half">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">デマンドID: {this.props.demand[0]}</p>
                        <a href="#" className="card-header-icon" aria-label="more options"></a>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <div className="columns is-gapless is-mobile">
                                <div className="column is-two-fifths">
                                    <h1>出発地</h1>
                                    <h3>{this.props.demand[6]}</h3>
                                    <h5>緯度:{this.props.demand[7]}</h5>
                                    <h5>軽度:{this.props.demand[8]}</h5>
                                </div>
                                <div className="column">
                                    <FontAwesomeIcon icon={['fas', 'arrow-right']} size="3x"/>
                                </div>
                                <div className="column is-two-fifths">
                                    <h1>到着地</h1>
                                    <h3>{this.props.demand[9]}</h3>
                                    <h5>緯度:{this.props.demand[10]}</h5>
                                    <h5>軽度:{this.props.demand[11]}</h5>
                                </div>
                                </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-item">
                            発車日時: {moment.unix(this.props.demand[4]).format('YYYY年MM月DD日(ddd) LT')}
                        </div>
                        <a className="card-footer-item" onClick={this.handleClick}>
                            <div className="columns is-vcentered is-mobile">
                                <div className="column is-1">
                                    <FontAwesomeIcon icon={['fas', 'car-side']} size="1x"/>
                                </div>
                                <div className="column">
                                    乗車する
                                    <br/>
                                    (残り席数{this.props.demand[5]})
                                </div>
                            </div>
                        </a>
                    </footer>
                </div>
            </div>
        )
    }
}
export default class ShowDemand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            methods: getMethods(),
            demands: []
        };
        getInstanceInfo();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        getDemandList().then(
            demands => {this.setState({demands: demands});}
        );
    }
    render(){
        const demandlist = [];
        this.state.demands.forEach(
            demand => {
                if(demand[5] > 0){
                    demandlist.push(<DemandInfo demand={demand} methods={this.state.methods} />);
                }
            }
        );
        return(
            <section className="section">
                <div className="columns is-centered is-multiline is-gapless">
                    <div className="column is-four-fifths">
                        <button onClick={this.handleClick} className="button is-rounded is-large is-outlined is-primary">
                            PUSH
                        </button>
                    </div>
                </div>
                <div className="columns is-centered is-multiline">
                    {demandlist}
                </div>
            </section>
        )
    }
}