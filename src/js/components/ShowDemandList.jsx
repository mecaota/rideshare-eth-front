import React from 'react';
import { buyTicket, getDemandList } from '../infra/web3connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var moment = require('moment');

class DemandInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passengers: this.props.passengers,
            isMine: this.props.demand.isMine,
            isPurchesed: this.props.demand.isPurchesed,
            item_id: this.props.demand.item_id,
            demand_id: this.props.demand.demand_id,
            price: this.props.demand.price,
            est_date: this.props.demand.est_date,
            dept_name: this.props.demand.dept_name,
            dept_latitude: this.props.demand.dept_latitude,
            dept_longitude: this.props.demand.dept_longitude,
            arrv_name: this.props.demand.arrv_name,
            arrv_latitude: this.props.demand.arrv_latitude,
            arrv_longitude: this.props.demand.arrv_longitude,
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        Promise.resolve(this.setState({isLoading: true})).then(
            ()=> {
                console.log(this.state);
                buyTicket(this.state.demand_id);
            }
        ).then(
            ()=>{this.setState({isLoading: false});}
        )
    }
    showButton(){
        if(this.state.isLoading){
            return (
                <div className="columns is-vcentered is-mobile">
                    <div className="column is-1">
                        <FontAwesomeIcon icon={['fas', 'sync']} size="1x" pull="left" spin />
                    </div>
                    <div className="column">
                        購入中・・・
                    </div>
                </div>
            )
        }else{
            return (
                <div className="columns is-vcentered is-mobile">
                    <div className="column is-1">
                        <FontAwesomeIcon icon={['fas', 'car-side']} size="1x" pull="left" />
                    </div>
                    <div className="column">
                        乗車する<br/>
                        (残り席数{this.state.passengers})
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div className="column is-half">
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">デマンド識別ID: {this.state.item_id}</p>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            <div className="columns is-mobile is-multiline is-centered">
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'plane-departure']} pull="left" />出発地</h1>
                                    <h3>{this.state.dept_name}</h3>
                                    <h5>緯度:{this.state.dept_latitude}</h5>
                                    <h5>軽度:{this.state.dept_longitude}</h5>
                                </div>
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'plane-arrival']} pull="left" />到着地</h1>
                                    <h3>{this.state.arrv_name}</h3>
                                    <h5>緯度:{this.state.arrv_latitude}</h5>
                                    <h5>軽度:{this.state.arrv_longitude}</h5>
                                </div>
                                <div className="column is-full">
                                    <h1><FontAwesomeIcon icon={['fas', 'yen-sign']} pull="left" />料金</h1>
                                    <h3>¥ {this.state.price}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="card-footer">
                        <div className="card-footer-item">
                            発車日時<br/>
                            {moment.unix(this.state.est_date).format('YYYY年MM月DD日(ddd)')}<br/>
                            {moment.unix(this.state.est_date).format('LT')}
                        </div>
                        <a className="card-footer-item" onClick={this.handleClick}>
                            {this.showButton()}
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
            demands: [],
            isLoading: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.toggleButton = this.toggleButton.bind(this);
    }
    handleClick(){
        Promise.resolve(this.setState({isLoading: true})).then(
            ()=>{return getDemandList();}
        ).then(
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
                    demandlist.push(<DemandInfo demand={demand} passengers={Object.keys(this.state.demands).length} />);
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