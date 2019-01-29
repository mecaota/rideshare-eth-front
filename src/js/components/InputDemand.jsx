import React from 'react';
import { getDemandOfOwnerList, mintDemands, burnMintedDemand, approveAllMintedTickets } from '../infra/web3connect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
var moment = require('moment');

export default class InputDemand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            passengers: 0,
            isMine: false,
            isPurchesed: false,
            item_id: 0,
            price: 0,
            est_date: moment().unix(),
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
        this.handleApprove = this.handleApprove.bind(this);
        this.setDemandInfo();
    }
    setDemandInfo(){
        return Promise.resolve(this.setState({isLoading: true})).then(
            ()=>{return getDemandOfOwnerList();}
        ).then(
            demands => {
                if(Object.keys(demands).length>0){
                    const demand = demands[0];
                    this.setState({
                        passengers: Object.keys(demands).length,
                        isMine: demand.isMine,
                        isPurchesed: demand.isPurchesed,
                        item_id: demand.item_id,
                        proce: demand.price,
                        est_date: demand.est_date,
                        dept_name: demand.dept_name,
                        dept_latitude: demand.dept_latitude,
                        dept_longitude: demand.dept_longitude,
                        arrv_name: demand.arrv_name,
                        arrv_latitude: demand.arrv_latitude,
                        arrv_longitude: demand.arrv_longitude
                    });
                }else{
                    this.setState({
                        passengers: 0,
                        isMine: false,
                        isPurchesed: false,
                        item_id: 0,
                        price: 0,
                        est_date: moment().unix(),
                        dept_name: "",
                        dept_latitude: 0,
                        dept_longitude: 0,
                        arrv_name: "",
                        arrv_latitude: 0,
                        arrv_longitude: 0,
                    });
                }
            }
        ).then(
            ()=>{this.setState({isLoading: false});}
        );
    }
    handleSubmit() {
        if(this.isDeployed()){
            /* デマンド更新処理の名残 */
        }else{
            Promise.resolve(this.setState({isLoading: true})).then(
                ()=>{
                    return mintDemands(
                        this.state.passengers,
                        this.state.price,
                        this.state.est_date,
                        this.state.dept_name,
                        this.state.dept_latitude,
                        this.state.dept_longitude,
                        this.state.arrv_name,
                        this.state.arrv_latitude,
                        this.state.arrv_longitude
                    )
                }
            ).then(
                ()=>this.setDemandInfo()
                ).then(
                ()=>this.setState({isLoading: false})
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
        if(this.isDeployed()){
            Promise.resolve(this.setState({isLoading: true})).then(
                ()=>{return burnMintedDemand();}
            ).then(
                ()=>{return this.setDemandInfo();}
            ).then(
                ()=>{return this.setState({isLoading: false});}
            );
        }
    }
    handleApprove(){
        if(this.isOveredTime()){
            Promise.resolve(this.setState({isLoading: true})).then(
                ()=>{return approveAllMintedTickets();}
            ).then(
                ()=>{return this.setDemandInfo();}
            ).then(
                ()=>{return this.setState({isLoading: false});}
            );
        }
    }
    isOveredTime(){
        return this.state.est_date < moment().unix();
    }
    isDeployed(){
        return this.state.item_id>0;
    }
    toggleButton(classes){
        if(this.state.isLoading){
            classes += " is-loading";
        }
        return classes;
    }
    toggleDisp(){
        if(this.isDeployed()){
            return (this.state.isLoading?"デマンド削除中です。お待ち下さい・・・":"発行済みデマンド");
        }else{
            return (this.state.isLoading?"デマンド発行中です。お待ち下さい・・・":"デマンド発行フォーム");
        }
    }
    showButton(){
        if(this.isDeployed()){
            if(this.isOveredTime()){
                return (
                    <footer className="card-footer">
                        <a type="button" className={this.toggleButton("button is-large is-danger card-footer-item")} onClick={this.handleDelete}>
                            <FontAwesomeIcon icon={['fas', 'trash']} pull="left" />
                            デマンド削除
                        </a>
                        <a type="button" className={this.toggleButton("button is-large is-info card-footer-item")} onClick={this.handleApprove}>
                            <FontAwesomeIcon icon={['fas', 'user-friends']} pull="left" />
                            マッチングを承認する
                        </a>
                    </footer>
                )
            }else{
                return (
                    <footer className="card-footer">
                        <button type="button" className={this.toggleButton("button is-large is-danger card-footer-item")} onClick={this.handleDelete}>
                            <FontAwesomeIcon icon={['fas', 'trash']} pull="left" />
                            デマンド削除
                        </button>
                    </footer>
                )
            }
        }else{
            return (
                <footer className="card-footer">
                    <button type="submit" className={this.toggleButton("button is-large is-info card-footer-item")}>
                        <FontAwesomeIcon icon={['fas', 'check']} pull="left" />
                        デマンド発行
                    </button>
                </footer>
            )
        }
    }
    render(){
        return(
            <div className="column is-full">
                <div className="card">
                    <form action="javascript:void(0)" onSubmit={this.handleSubmit} accept-charset="UTF-8">
                        {/* demand id */}
                        <header className="card-header">
                            <p className="card-header-title">{this.toggleDisp()}</p>
                        </header>
                        <div className="card-content">
                            <div className="columns is-multiline">
                                <div className="column">
                                    {/* demand id */}
                                    <div className="field">
                                        <label className="label" htmlFor="item_id">
                                            <FontAwesomeIcon icon={['fas', 'id-card-alt']} />
                                            デマンド識別ID
                                            <input className="input" type="text" name="item_id" value={this.isDeployed()?this.state.item_id:"デマンド未発行"} onChange={this.handleChange} readOnly/>
                                        </label>
                                    </div>
                                    {/* estimated date */}
                                    <div className="field">
                                        <label className="label" htmlFor="est_date">
                                            <FontAwesomeIcon icon={['fas', 'clock']} />
                                            出発予定日時
                                            <input required className="input" type="datetime-local" name="est_date" min={moment().format("YYYY-MM-DDTHH:mm")} value={moment.unix(this.state.est_date).format("YYYY-MM-DDTHH:mm")} onChange={this.handleChange}/>
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                                <div className="column">
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
                                            <input required className="input" type="number" name="passengers" min='1' max='256' value={this.state.passengers} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                            <div className="columns is-multiline">
                                <div className="column">
                                    <h1 className="is-size-4"><FontAwesomeIcon icon={['fas', 'plane-departure']} />出発地</h1>
                                    {/* dept_name */}
                                    <div className="field">
                                        <label className="label" htmlFor="dept_name">
                                            出発場所名
                                            <input required className="input" type="text" name="dept_name" value={this.state.dept_name} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    {/* dept_latitude */}
                                    <div className="field">
                                        <label className="label" htmlFor="dept_latitude">
                                            出発緯度
                                            <input className="input" type="number" name="dept_latitude" max="90" min="-90" step="0.000001" value={this.state.dept_latitude} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    {/* dept_longtitude */}
                                    <div className="field">
                                        <label className="label" htmlFor="dept_longitude">
                                            出発経度
                                            <input className="input" type="number" name="dept_longitude" max="180" min="-180" step="0.000001" value={this.state.dept_longitude} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                                <div className="column">
                                    {/* arrv_name */}
                                    <div className="field">
                                        <h1 className="is-size-4"><FontAwesomeIcon icon={['fas', 'plane-arrival']} />到着地</h1>
                                        <label className="label" htmlFor="arrv_name">
                                            到着場所名
                                            <input required className="input" type="text" name="arrv_name" value={this.state.arrv_name} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    {/* arrv_latitude */}
                                    <div className="field">
                                        <label className="label" htmlFor="arrv_latitude">
                                            到着緯度
                                            <input className="input" type="number" name="arrv_latitude" max="90" min="-90" step="0.000001" value={this.state.arrv_latitude} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    {/* arrv_longtitude */}
                                    <div className="field">
                                        <label className="label" htmlFor="arrv_longitude">
                                            到着経度
                                            <input className="input" type="number" name="arrv_longitude" max="180" min="-180" step="0.000001" value={this.state.arrv_longitude} onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                        {/* submit button */}
                        {this.showButton()}
                        <br />
                    </form>
                </div>
            </div>
        )
    }
}