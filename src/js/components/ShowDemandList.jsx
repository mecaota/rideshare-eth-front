import React from 'react';
import { getWeb3Event, getMethods, getInstanceInfo, getDemandList, getSelectedAddress } from '../infra/web3connect';
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
        this.props.methods.buyTicket(this.props.demand.demand_id).send(
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
                        <p className="card-header-title">デマンドID: {this.props.demand.demand_id}</p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <div className="columns is-mobile is-multiline is-centered">
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'plane-departure']} pull="left" />出発地</h1>
                                    <h3>{this.props.demand.dept_name}</h3>
                                    <h5>緯度:{this.props.demand.dept_latitude}</h5>
                                    <h5>軽度:{this.props.demand.dept_longitude}</h5>
                                </div>
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'plane-arrival']} pull="left" />到着地</h1>
                                    <h3>{this.props.demand.arrv_name}</h3>
                                    <h5>緯度:{this.props.demand.arrv_latitude}</h5>
                                    <h5>軽度:{this.props.demand.arrv_longitude}</h5>
                                </div>
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'yen-sign']} pull="left" />料金</h1>
                                    <h3>¥ {this.props.demand.price}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-item">
                            発車日時<br/>
                            {moment.unix(this.props.demand.est_date).format('YYYY年MM月DD日(ddd)')}<br/>
                            {moment.unix(this.props.demand.est_date).format('LT')}
                        </div>
                        <a className="card-footer-item" onClick={this.handleClick}>
                            <div className="columns is-vcentered is-mobile">
                                <div className="column is-1">
                                    <FontAwesomeIcon icon={['fas', 'car-side']} size="1x" pull="left" />
                                </div>
                                <div className="column">
                                    乗車する
                                    <br/>
                                    (残り席数{this.props.demand.passengers})
                                </div>
                            </div>
                        </a>
                    </footer>
                </div>
            </div>
        )
    }
}
export default class ShowDemandList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            methods: getMethods(),
            demands: [],
            isLoading: false
        };
        getInstanceInfo();
        this.handleClick = this.handleClick.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
    }
    handleClick() {
        this.setState({isLoading: true});
        getDemandList().then(
            demands => {
                this.setState({demands: demands});
            }
        ).then(
            ()=>{
                this.setState({isLoading: false});
            }
        );
    }
    toggleButton(classes){
        if(this.state.isLoading){
            classes += " is-loading";
        }
        return classes;
    }
    render(){
        const demandlist = [];
        this.state.demands.forEach(
            demand => {
                if(demand.demand_id > 0){
                    demandlist.push(<DemandInfo demand={demand} methods={this.state.methods} />);
                }
            }
        );
        return(
            <section className="section">
                <div className="columns is-centered is-multiline is-gapless">
                    <div className="column is-full">
                        <button onClick={this.handleClick} className={this.toggleButton("button is-large is-primary is-fullwidth")}>
                        <FontAwesomeIcon icon={['fas', 'sync-alt']} size="1x"/>デマンドリスト更新
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