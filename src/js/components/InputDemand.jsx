import React from 'react';
import { getMethods, getSelectedAddress, getDemandOfOwner } from '../infra/web3connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var moment = require('moment');

export default class InputDemand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            demand_id: 0,
            minter: "",
            upd_date: 0,
            est_date: 0,
            price: 0,
            passengers: 0,
            dept_name: "",
            dept_latitude: 0,
            dept_longitude: 0,
            arrv_name: "",
            arrv_latitude: 0,
            arrv_longitude: 0,
            isLoading: false,
            FormEnable: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.setDemandInfo();
    }
    handleSubmit() {
        var methods = getMethods();
        if(this.isDeployed()){
            methods.update_demand(
                this.state.demand_id,
                this.state.est_date,
                this.state.price,
                this.state.passengers,
                this.state.dept_name,
                this.state.dept_latitude,
                this.state.dept_longitude,
                this.state.arrv_name,
                this.state.arrv_latitude,
                this.state.arrv_longitude
            ).send({from: getSelectedAddress()}).then(
                receipt => {
                    this.setState({isLoading: false});
                    console.log(receipt);
                }, error => {
                    this.setState({isLoading: false});
                    console.log(error);
                }
            );
        }else{
            methods.mint_demand(
                this.state.est_date,
                this.state.price,
                this.state.passengers,
                this.state.dept_name,
                this.state.dept_latitude,
                this.state.dept_longitude,
                this.state.arrv_name,
                this.state.arrv_latitude,
                this.state.arrv_longitude
            ).send({from: getSelectedAddress()}).then(
                receipt => {
                    this.setState({isLoading: false});
                    console.log(receipt);
                }, error => {
                    this.setState({isLoading: false});
                    console.log(error);
                }
            );
        }
    }
    handleChange(event) {
        if(event.target.name == "est_date"){
            this.setState({[event.target.name]: moment(event.target.value).unix()});
        }else{
            this.setState({[event.target.name]: event.target.value});
        }
    }
    handleDelete() {
        var methods = getMethods();
        if(this.isDeployed()){
            methods.burn(this.state.demand_id).send({from: getSelectedAddress()}).then(
                receipt => {
                    this.setState({isLoading: false});
                    console.log(receipt);
                }, error => {
                    this.setState({isLoading: false});
                    console.log(error);
                }
            );
        }
    }
    isDeployed(){
        return this.state.demand_id>0;
    }
    toggleButton(classes){
        if(this.state.isLoading){
            classes += " is-loading";
        }
        return classes;
    }
    showDeleteButton(){
        if(this.isDeployed()){
            return (
                <button type="button" className={this.toggleButton("button is-large is-danger card-footer-item")} onClick={this.handleDelete}>
                    <FontAwesomeIcon icon={['fas', 'trash']} pull="left" />
                    削除
                </button>
            )
        }
    }
    setDemandInfo(){
        this.setState({isLoading: true});
        getDemandOfOwner().then(
            demand => {
                this.setState({
                    demand_id: demand.demand_id,
                    minter: demand.minter,
                    upd_date: demand.upd_date,
                    est_date: demand.est_date,
                    price: demand.price,
                    passengers: demand.passengers,
                    dept_name: demand.dept_name,
                    dept_latitude: demand.dept_latitude,
                    dept_longitude: demand.dept_longitude,
                    arrv_name: demand.arrv_name,
                    arrv_latitude: demand.arrv_latitude,
                    arrv_longitude: demand.arrv_longitude,
                    isLoading: true
                });
            }
        ).then(
            () => {
                this.setState({isLoading: false});
            }
        );
    }
    render(){
        return(
            <div className="columns is-centered is-multiline">
                <div className="column is-full">
                    <div className="card">
                        <form action="javascript:void(0)" onSubmit={this.handleSubmit} accept-charset="UTF-8">
                            {/* demand id */}
                            <header className="card-header">
                                <p className="card-header-title">{this.isDeployed()?"デマンド編集フォーム":"デマンド発行フォーム"}</p>
                            </header>
                            <div className="card-content">
                                <div className="field">
                                    <label className="label" htmlFor="demand_id">
                                        <FontAwesomeIcon icon={['fas', 'id-card-alt']} />
                                        デマンドID
                                        <input className="input" type="text" name="demand_id" value={this.isDeployed()?this.state.demand_id:"デマンド未発行"} onChange={this.handleChange} readOnly/>
                                    </label>
                                </div>
                                {/* estimated date */}
                                <div className="field">
                                    <label className="label" htmlFor="est_date">
                                        <FontAwesomeIcon icon={['fas', 'clock']} />
                                        デマンド登録日時
                                        <input className="input" type="datetime-local" name="est_date" min={moment().format("YYYY-MM-DDTHH:mm")} value={moment.unix(this.state.est_date).format("YYYY-MM-DDTHH:mm")} onChange={this.handleChange}/>
                                    </label>
                                </div>
                                <hr />
                                {/* price */}
                                <div className="field">
                                    <label className="label" htmlFor="price">
                                        <FontAwesomeIcon icon={['fas', 'yen-sign']} />
                                        設定価格
                                        <input className="input" type="number" name="price" value={this.state.price} onChange={this.handleChange}/>
                                    </label>
                                </div>
                                {/* passengers */}
                                <div className="field">
                                    <label className="label" htmlFor="passengers">
                                        <FontAwesomeIcon icon={['fas', 'users']} />
                                        募集人数
                                        <input className="input" type="number" name="passengers" required min='1' max='256' value={this.state.passengers} onChange={this.handleChange} />
                                    </label>
                                </div>
                                <hr />
                                
                                <h1 className="is-size-4"><FontAwesomeIcon icon={['fas', 'plane-departure']} />出発地</h1>
                                {/* dept_name */}
                                <div className="field">
                                    <label className="label" htmlFor="dept_name">
                                        出発場所名
                                        <input className="input" type="text" name="dept_name" value={this.state.dept_name} onChange={this.handleChange} />
                                    </label>
                                </div>
                                {/* dept_latitude */}
                                <div className="field">
                                    <label className="label" htmlFor="dept_latitude">
                                        出発緯度
                                        <input className="input" type="number" name="dept_latitude" value={this.state.dept_latitude} onChange={this.handleChange} />
                                    </label>
                                </div>
                                {/* dept_longtitude */}
                                <div className="field">
                                    <label className="label" htmlFor="dept_longitude">
                                        出発経度
                                        <input className="input" type="number" name="dept_longitude" value={this.state.dept_longitude} onChange={this.handleChange} />
                                    </label>
                                </div>
                                <hr />
                                {/* arrv_name */}
                                <h1 className="is-size-4"><FontAwesomeIcon icon={['fas', 'plane-arrival']} />到着地</h1>
                                <label className="label" htmlFor="arrv_name">
                                    到着場所名
                                    <input className="input" type="text" name="arrv_name" value={this.state.arrv_name} onChange={this.handleChange} />
                                </label>
                                {/* arrv_latitude */}
                                <label className="label" htmlFor="arrv_latitude">
                                    到着緯度
                                    <input className="input" type="number" name="arrv_latitude" value={this.state.arrv_latitude} onChange={this.handleChange} />
                                </label>
                                {/* arrv_longtitude */}
                                <label className="label" htmlFor="arrv_longitude">
                                    到着経度
                                    <input className="input" type="number" name="arrv_longitude" value={this.state.arrv_longitude} onChange={this.handleChange} />
                                </label>
                            </div>
                            {/* submit button */}
                            <footer className="card-footer">
                                {this.showDeleteButton()}
                                <button type="submit" className={this.toggleButton("button is-large is-info card-footer-item")}>
                                    <FontAwesomeIcon icon={['fas', 'check']} pull="left" />
                                    送信
                                </button>
                            </footer>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}