import React, { Component } from 'react';


class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }

        this.search = this.search.bind(this);
    }

    search(e){
        this.setState({search: e.target.value.toUpperCase()});
    }

    render() {
       
        return (
            <div className="walletContainer">
                <div>
                <form>
                    <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search" id="searchMarket" onChange={this.search}></input>
                    </form>
                </div>
                <table>
                    <thead>

                        <tr>
                            <td>Symbol</td>
                            <td>Available (on Exchange)</td>
                            <td></td>
                            <td>Available (on EOS chain)</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.balance.map(sym => {
                            if(sym.token.includes(this.state.search)) {
                            return (
                                <tr>
                                    <td><a href={'/exchange/?opt=' + sym.token}>{sym.token}</a></td>
                                    <td>{Number(sym.amount).toFixed(this.props.tokens[sym.token].precision)}</td>
                                    <td><a id={sym.token} onClick={(e) => this.props.changeView("withdraw", e.target.id)} style={{display:'inline-block'}}>Withdraw</a> / <a id={sym.token} onClick={(e) => this.props.changeView("deposit", e.target.id)} style={{display:'inline-block'}}>Deposit</a> / <a id={sym.token} onClick={(e) => this.props.changeView("transfer", e.target.id)} style={{display:'inline-block'}}>Transfer</a></td>
                                    <td>{Number(sym.chainBal).toFixed(this.props.tokens[sym.token].precision)}</td>                                 
                                </tr>
                            )
                            } else  {
                                return null;
                            }
                        })
                        }
                        {
                            this.props.symbols.map(sym => {
                                if(sym.includes(this.state.search)) {
                                return (
                                    <tr>
                                        <td><a href={'/exchange/?opt=' + sym.token}>{sym}</a></td>
                                        <td>0.0000</td>
                                        <td></td>
                                        <td>0.0000</td>
                                    </tr>
                                )
                                } else return null
                            }

                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Wallet;