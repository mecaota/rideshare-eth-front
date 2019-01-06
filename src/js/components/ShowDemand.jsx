import React from 'react';
import { eth, getMethods, getInstanceInfo, getSelectedAddress } from '../infra/web3connect'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class ShowDemand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            methods: getMethods()
        };
        getInstanceInfo();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log("pushed");
    }
    render(){
        return(
            <div className="columns is-centered is-multiline">
                <div className="column is-four-fifths">
                    <button onClick={this.handleClick} class="button is-rounded is-large is-outlined is-primary">
                        PUSH
                    </button>
                </div>
            </div>
        )
    }
}