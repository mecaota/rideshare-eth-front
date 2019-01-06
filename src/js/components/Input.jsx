import React from 'react';
import { eth, getInstance, isEnabledWeb3, getSelectedAddress } from '../infra/web3connect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class Input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            FormEnable: false,
            est_date: new Date(),
            token_id: 0,
            price:0,
            passengers: '',
            dept_name: '',
            dept_latitude: '',
            dept_longitude: '',
            arrv_name: '',
            arrv_latitude: '',
            arrv_longitude: '',
            methods: getInstance().methods
        };
        console.log("contract objectだす");
        console.log(this.state.methods);
        console.log(this.state.methods.ownerOf(getSelectedAddress()));
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        var methods = getInstance().methods;
        console.log(methods);
        console.log("mint_demand run");
        console.log(
            this.state.price,
            Date.parse(this.state.est_date),
            this.state.passengers,
            this.state.dept_name,
            this.state.dept_latitude,
            this.state.dept_longitude,
            this.state.arrv_name,
            this.state.arrv_latitude,
            this.state.arrv_longitude
        );
        console.log(
            methods.mint_demand(
                this.state.price,
                Date.parse(this.state.est_date),
                this.state.passengers,
                this.state.dept_name,
                this.state.dept_latitude,
                this.state.dept_longitude,
                this.state.arrv_name,
                this.state.arrv_latitude,
                this.state.arrv_longitude
            ).send({from: getSelectedAddress()})
        );
        console.log("Passengers");
        console.log(this.state.passengers);
        console.log("Price");
        console.log(this.state.price);
        console.log("arrival Spot");
        console.log(this.state.arrv_name);
    }
    handleChange (event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render(){
        return(
            <div className="columns is-centered is-multiline">
                <div className="column is-four-fifths">
                    <button onClick={() => this.setState(this.state.FormEnable?{FormEnable:false}:{FormEnable:true})} class="button is-rounded is-large is-outlined is-primary">
                        {SwitchButton(this.state.FormEnable)}
                    </button>
                </div>
                <form action="javascript:void(0)" onSubmit={this.handleSubmit} accept-charset="UTF-8">
                    {/* token id */}
                    <label htmlFor="token_id">デマンドID
                        <input type="number" name="token_id" value={this.state.est_date.toLocaleString()} onChange={this.handleChange} readOnly/>
                    </label>
                    <br />
                    {/* estimated date */}
                    <label htmlFor="est_date">デマンド登録日時
                        <input type="text" name="est_date" value={this.state.est_date.toLocaleString()} onChange={this.handleChange} readOnly/>
                    </label>
                    <br />
                    <hr />
                    {/* price */}
                    <label htmlFor="price">設定価格
                        <input type="number" name="price" value={this.state.price} onChange={this.handleChange} readOnly/>
                    </label>
                    <br />
                    {/* passengers */}
                    <label htmlFor="passengers">募集人数
                        <input type="number" min='1' max='256' name="passengers" required value={this.state.passengers} onChange={this.handleChange} />
                    </label>
                    <br />
                    <hr />
                    {/* dept_name */}
                    <label htmlFor="dept_name">出発場所名
                        <input type="text" name="dept_name" value={this.state.dept_name} onChange={this.handleChange} />
                    </label>
                    <br />
                    {/* dept_latitude */}
                    <label htmlFor="dept_latitude">出発緯度
                        <input type="number" name="dept_latitude" value={this.state.dept_latitude} onChange={this.handleChange} />
                    </label>
                    <br />
                    {/* dept_longtitude */}
                    <label htmlFor="dept_longitude">出発経度
                        <input type="number" name="dept_longitude" value={this.state.dept_longitude} onChange={this.handleChange} />
                    </label>
                    <br />
                    <hr />
                    {/* arrv_name */}
                    <label htmlFor="arrv_name">到着場所名
                        <input type="text" name="arrv_name" value={this.state.arrv_name} onChange={this.handleChange} />
                    </label>
                    <br />
                    {/* arrv_latitude */}
                    <label htmlFor="arrv_latitude">到着緯度
                        <input type="number" name="arrv_latitude" value={this.state.arrv_latitude} onChange={this.handleChange} />
                    </label>
                    <br />
                    {/* arrv_longtitude */}
                    <label htmlFor="arrv_longitude">到着経度
                        <input type="number" name="arrv_longitude" value={this.state.arrv_longitude} onChange={this.handleChange} />
                    </label>
                    <br />
                    <hr />
                    {/* submit button */}
                    <button type="submit">送信</button>
                    <br />
                </form>
            </div>
        )
    }
}

function SwitchButton(form_enable){
    var text = "";
    var icon = [];
    if(form_enable){
        text = "閉じる";
        icon = ['fas', 'minus-circle'];
    }else{
        text = "デマンドを追加";
        icon = ['fas', 'plus-circle'];
    }
    return (
        <div>
            <FontAwesomeIcon icon={icon} />{text}
        </div>
    )
}
