import React, {Component} from 'react';
import scatter from './imgs/scatter.PNG';
import logoBlue from './imgs/logoBlue.png';
import $ from "jquery";

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

// const network = { blockchain:'eos',
//                 protocol:'https',
//                 host:'proxy.eosnode.tools',
//                 port:443,
//                 chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' }

const network = {
                    blockchain:'eos',
                    protocol:'http',
                    host:'13.52.54.111',
                    eosVersion: 'bf28f8bb',
                    port:8888,
                    chainId:'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
                    debug: false,
                    verbose: false,
                    latency: 200
                }



function handleClicks(e) {
    e.preventDefault();
    $('.signInPopup ').fadeOut();
  }
  

class Footer extends Component{
    constructor(props) {
        super(props);
        console.log("props: ", props);
        this.handleClickss = this.handleClickss.bind(this);
        // this.setState = props.setState.bind(this);
    }

    async handleClickss(e){
        console.log(this.props)
        e.preventDefault();
        const scatter = ScatterJS.scatter;
        let connected = await scatter.connect("UberDEX");
    
    
        // If the user does not have Scatter or it is Locked or Closed this will return false;
        if(!connected) return false;
    
        // Check the scatter identity of the user
        const requiredFields = { accounts:[network] };
        let id = await scatter.getIdentity(requiredFields);
        console.log("id: ", id);
        const account = id.accounts.find(x => x.blockchain === 'eos');
        console.log("account: ", account);
    
        const eosOptions = { expireInSeconds:60 }

        const eos = scatter.eos(network, Eos, eosOptions)

        this.props.updateScatterID(true)
        console.log("Scatter ID in components: ", this.props.scatterID.ScatterId);
        
        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        // const eos = scatter.eos(network, Eos, eosOptions);
        if(scatter.identity){
            $('#signin').hide();
            $('#signout').css('display','inline-block');
            $('.bgs').html(scatter.identity.accounts[0].name);
            $('.signInPopup ').fadeIn();
        } else {
            $('#signin').css('display','inline-block');
            $('#signout').hide();
        }
    }


    render(){
       
        return(
            <div>
                <div className="footer">
                    <div className="container clearfix">
                        <img src={logoBlue} />
                        <p>Cryptocurrency investment is subject to high market risk, please make your investments cautiously.</p>
                        <span>© UberDex Inc 2018. All Right Reserved.</span>
                        <ul>
                            <li><a href="/about">About </a></li>
                            <li><a href="/user_agreement">User Agreement</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/contact">Support</a></li>
                            <li><a href="/trade">How to Trade</a></li>
                        </ul>
                    </div>
                </div>

                <div className="signInPopup">
                    <div className="inners">
                        <a href="#" className="cls"  onClick={handleClicks}><i className="fa fa-times"></i></a>
                        <img src={scatter} />
                        <a href="#" className="sgn" onClick={this.handleClickss}>Sign in via Scatter</a>
                        <p>Scatter allows convenient transactions without password</p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Footer;