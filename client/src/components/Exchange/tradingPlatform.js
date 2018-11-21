import React, {Component} from 'react';
import Datafeed from '../TVChartContainer/api/index';
import $ from "jquery";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import Trading from './trading';
import Order from './order';
import History from './orderHistory';

import data from '../../app.json';
var color = {background: data['theme_color']};
var colors = {color: data['theme_color']};
var logoUrl = '/img/'+data['logo'];



function handlelight(e)
  {
    e.preventDefault();
    $('.lightT').css('display', 'none');
    $('.darkt').css('display', 'inline-block');
    $('body').removeClass('darkVersion');
    $('body').addClass('lightVersion');
    $('.demo-big-content').removeClass('darkVersion');
    
    const widgetOptions = {
        debug: false,
        symbol: c+':EOS',
        datafeed: Datafeed,
        interval: '60',
        container_id: 'tv_chart_container',
        library_path: '/charting_library/',
        locale: getLanguageFromURL() || 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studies_overrides: {},
        overrides: {
            "mainSeriesProperties.showCountdown": true,
            "paneProperties.background": "#fff",
            "paneProperties.vertGridProperties.color": "#363c4e",
            "paneProperties.horzGridProperties.color": "#363c4e",
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor" : "#AAA",
            "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
            "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
        }
    };
    const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
    
  }


  function handledark(e)
  {
    e.preventDefault();
    const widgetOptions = {
        debug: false,
        symbol: c+':EOS',
        datafeed: Datafeed,
        interval: '60',
        container_id: 'tv_chart_container',
        library_path: '/charting_library/',
        locale: getLanguageFromURL() || 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        charts_storage_url: 'https://saveload.tradingview.com',
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studies_overrides: {},
        overrides: {
            "mainSeriesProperties.showCountdown": true,
            "paneProperties.background": "#52565a",
            "paneProperties.vertGridProperties.color": "#363c4e",
            "paneProperties.horzGridProperties.color": "#363c4e",
            "symbolWatermarkProperties.transparency": 90,
            "scalesProperties.textColor" : "#AAA",
            "mainSeriesProperties.candleStyle.wickUpColor": '#336854',
            "mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
        }
        };
    const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);
    $('.darkt').css('display', 'none');
    $('.lightT').css('display', 'inline-block');
    $('body').removeClass('lightVersion');
    $('body').addClass('darkVersion');
  }

function handlePublic(e){
    e.preventDefault();
     var scatter =ScatterJS.scatter;
     if(scatter.identity){   alert(scatter.identity.publicKey);}
//console.log(scatter.identity.publicKey);
}

function handlesign(e) {
    e.preventDefault();
    $('.signInPopup ').fadeIn();
  }
  
function handleSignout(e){
    e.preventDefault();
     ScatterJS.scatter.forgetIdentity();
 window.location.reload();
}
  

function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(window.location.search);
	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
function reloadPage()
{
    window.location.reload();
}

function closeIntro()
{
    $('.introAlart').fadeOut();
}
function tackerView(e) {
    e.preventDefault();
    var views = e.target.id;
    $('#view'+views).fadeIn();
}
function closeView(e){
    e.preventDefault();
    $('.tradeWrap').fadeOut();
}


function handleClick(e) {
    e.preventDefault();
    var amount_two = e.target.nextSibling.id;
    var amount_twos = e.target.nextSibling.nextSibling.id;
    var amount = e.target.id;
    
     var ID = $(e.target).data('id');
    var assetbuy = $(e.target).data('assetbuy');
    var assetsell = $(e.target).data('assetsell');
    var amountsell = $(e.target).data('amountsell');
    var amountbuy = $(e.target).data('amountbuy');
    var prices = $(e.target).data('price');
    var maker = $(e.target).data('maker');
    var makerexchange = $(e.target).data('makerexchange');
    var side = $(e.target).data('side');
    
    document.getElementById('ID').value = ID;
    document.getElementById('assetbuy').value = assetbuy;
    document.getElementById('assetsell').value = assetsell;
    document.getElementById('amountsell').value = amountsell;
    document.getElementById('amountbuy').value = amountbuy;
    document.getElementById('maker').value = maker;
    document.getElementById('prices').value = prices;
    document.getElementById('makerexchange').value = makerexchange;
    document.getElementById('side').value = side;
    document.getElementById('priceTwo').value = '';
    document.getElementById('BuyPricetwos').value = '';
    document.getElementById('BuyPricetwo').value = '';
    document.getElementById('sellPricetwo').value = '';
  //  console.log(amount_twos);
   $('#apiType').val('take');
    document.getElementById('price').value = amount;
    document.getElementById('buyPrices').value = amount_two;
    document.getElementById('buyPrice').value = amount_two;
    document.getElementById('sellPrice').value = amount_twos;
    
  }
  function handleBuy(e)
{
    e.preventDefault();
     var url = new URL(window.location.href);
        var c = url.searchParams.get("opt");
                  var bprice= parseFloat($('#buyPrice').val());
       var sellPrice= parseFloat($('#sellPrice').val());
       var price= parseFloat($('#price').val());
       var tps=1;
       var myuri='';
       if($('#apiType').val()=='make')
       {
        var datas = {
            "side": "BUY",
            "assetBuy": c,
            "assetSell": "EOS",
            "amountBuy": bprice,
            "amountSell": sellPrice,
            "price": price,
            "expires": "3d",
            "type": tps,
            "useraccount": 'taker1'
      };
    myuri='https://api.byzanti.ne/orderMake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
   
       }
       else
       {
            var bprice= parseFloat($('#amountbuy').val());
       var sellPrice= parseFloat($('#amountsell').val());
       var pricess= parseFloat($('#prices').val());
       var maker = $('#maker').val();
       var makerexchange = $('#makerexchange').val();
       var ids = $('#ID').val();
       var side= $('#side').val();
       if(side=='BUY')
       {
          var datas = 
    {
        "orderId": ids,
        "assetBuy": c,
        "assetSell": 'EOS',
        "amountBuy": sellPrice,
        "amountSell": bprice,
        "price": pricess,
        "taker": "taker1",
        "maker": maker,
        "takerExchange": "uberdex",
        "makerExchange": makerexchange
      };
       }
       else
       {
          var datas = 
    {
        "orderId": ids,
        "assetBuy": c,
        "assetSell":'EOS',
        "amountBuy": bprice,
        "amountSell": sellPrice,
        "price": pricess,
        "taker": "taker1",
        "maker": maker,
        "takerExchange": "uberdex",
        "makerExchange": makerexchange
      };
       }
    
      myuri='https://api.byzanti.ne/orderTake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
       }
  
     fetch(myuri, {
     method: 'POST',headers: {
  //  'Accept': 'application/json',
    'Content-Type': 'application/json',
  },  body: JSON.stringify(datas)})
        .then(response => response.json())
        .then(data => {if($('#apiType').val()=='make'){ if(data.orderId){
            
            $('#contentToShow').html('Order Id : '+data.orderId);$('#msg').html('Success');$('.sellAlart').show();}else if(data.code){$('#contentToShow').html('Error Code : '+data.code);$('#msg').html('Error');$('.sellAlart').show();}}else{ if(data.tradeId){$('#contentToShow').html('Trade Id : '+data.tradeId+'<br />result : Created <br />BlockNumber : '+data.blockNumber+'<br />TransactionId : <a href="/transaction/?trxID='+data.transactionId+'&blocknumber='+data.blockNumber+'">'+data.transactionId+'</a>');console.log(data);$('#msg').html('Success');$('.sellAlart').show();}else{$('#contentToShow').html('Status Code : '+data.statusCode+"<br /> Message : "+data.message+"<br /> Code : "+data.code+"<br /> Order Id : "+ids);$('#msg').html('Error');$('.sellAlart').show();}}//window.location.reload()
      }
        );
        
     
}
 function handleSell(e)
{
    e.preventDefault();
    
     var url = new URL(window.location.href);
        var c = url.searchParams.get("opt");
        var price= parseFloat($('#priceTwo').val());
        var bprice= parseFloat($('#BuyPricetwo').val());
        var sellPrice= parseFloat($('#sellPricetwo').val());
      
        var tps=1;
        var myuri='';
        if($('#apiType').val()=='make')
        {
            var datas = {
                "side": "SELL",
                "assetBuy": "EOS",
                "assetSell": c,
                "amountBuy": bprice,
                "amountSell": sellPrice,
                "price": price,
                "expires": "3d",
                "type": tps,
                "useraccount": 'taker1'
          };
     myuri='https://api.byzanti.ne/ordermake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        }
        else
        {
               var bprice= parseFloat($('#amountbuy').val());
       var sellPrice= parseFloat($('#amountsell').val());
       var pricess= parseFloat($('#prices').val());
       var maker = $('#maker').val();
       var makerexchange = $('#makerexchange').val();
       var ids = $('#ID').val();
      var side= $('#side').val();
       if(side=='BUY')
       {
          var datas = 
    {
        "orderId": ids,
        "assetBuy": 'EOS',
        "assetSell":c,
        "amountBuy": sellPrice,
        "amountSell": bprice,
        "price": pricess,
        "taker": "taker1",
        "maker": maker,
        "takerExchange": "uberdex",
        "makerExchange": makerexchange
      };
       }
       else
       {
          var datas = 
    {
        "orderId": ids,
        "assetBuy": c,
        "assetSell":'EOS',
        "amountBuy": sellPrice,
        "amountSell": bprice,
        "price": pricess,
        "taker": "taker1",
        "maker": maker,
        "takerExchange": "uberdex",
        "makerExchange": makerexchange
      };
       }
    
      myuri='https://api.byzanti.ne/orderTake/?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        }
     
      
     fetch(myuri, {
     method: 'POST',headers: {
  //  'Accept': 'application/json',
    'Content-Type': 'application/json',
  },  body: JSON.stringify(datas)})
        .then(response => response.json())
        .then(data => {if($('#apiType').val()=='make'){ if(data.orderId){
            $('#contentToShow').html('Order Id : '+data.orderId);$('#msg').html('Success');$('.sellAlart').show();}else if(data.code){$('#contentToShow').html('Error Code : '+data.code);$('#msg').html('Error');$('.sellAlart').show();}}else{ if(data.tradeId){$('#contentToShow').html('Trade Id : '+data.tradeId+'<br />result : Created <br />BlockNumber : '+data.blockNumber+'<br />TransactionId : <a href="/transaction/?trxID='+data.transactionId+'&blocknumber='+data.blockNumber+'">'+data.transactionId+'</a>');console.log(data);$('#msg').html('Success');$('.sellAlart').show();}else{$('#contentToShow').html('Status Code : '+data.statusCode+"<br /> Message : "+data.message+"<br /> Code : "+data.code+"<br /> Order Id : "+ids);$('#msg').html('Error');$('.sellAlart').show();}}//window.location.reload()
       }
    );
        
}
function changeSellPrice1(e)
{
     e.preventDefault();
    var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#price').val());
    $('#apiType').val('make');
    $('#sellPrice').val(price*sellPrice);
}
function changeSellPrice(e)
{
    e.preventDefault();
    var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#price').val());
    $('#buyPrice').val(price/sellPrice);
    $('#apiType').val('make');
}
function changeBuyPrice1(e)
{
    e.preventDefault();
     var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#priceTwo').val());
    $('#sellPricetwo').val(price*sellPrice);
    $('#apiType').val('make');
}
function changeBuyPrice(e)
{
    e.preventDefault();
     var price= parseFloat(e.target.value);
    var sellPrice= parseFloat($('#priceTwo').val());
    $('#BuyPricetwo').val(price/sellPrice);
    $('#apiType').val('make');
}
function handleClicks(e) {
    e.preventDefault();
    var amount_four = e.target.nextSibling.id;
    var amount_fours = e.target.nextSibling.nextSibling.id;
    var amounts = e.target.id;

    var ID = $(e.target).data('id');
    var assetbuy = $(e.target).data('assetbuy');
    var assetsell = $(e.target).data('assetsell');
    var amountsell = $(e.target).data('amountsell');
    var amountbuy = $(e.target).data('amountbuy');
    var prices = $(e.target).data('price');
    var maker = $(e.target).data('maker');
    var makerexchange = $(e.target).data('makerexchange');
    var side = $(e.target).data('side');
    
    document.getElementById('ID').value = ID;
    document.getElementById('assetbuy').value = assetbuy;
    document.getElementById('assetsell').value = assetsell;
    document.getElementById('amountsell').value = amountsell;
    document.getElementById('amountbuy').value = amountbuy;
    document.getElementById('maker').value = maker;
    document.getElementById('prices').value = prices;
    document.getElementById('makerexchange').value = makerexchange;
    document.getElementById('side').value = side;
    document.getElementById('priceTwo').value = amounts;
    document.getElementById('BuyPricetwos').value = amount_four;
    document.getElementById('BuyPricetwo').value = amount_four;
    document.getElementById('sellPricetwo').value = amount_fours;
    $('#apiType').val('take');
     document.getElementById('price').value = '';
    document.getElementById('buyPrices').value = '';
    document.getElementById('buyPrice').value = '';
    document.getElementById('sellPrice').value = '';
  }
 var url = new URL(window.location.href);
     var     c = url.searchParams.get("opt");

     
     function handlechart(){
        alert('ads');
    }

    
function tackerViews(e) {
    e.preventDefault();
    var views = e.target.id;
    $('#views'+views).fadeIn();
}
function closeViews(e){
    e.preventDefault();
    $('.tradeWrap').fadeOut();
}


function orderView(e) {
    e.preventDefault();
    var views = e.target.id;
  //  console.log(views);
    $('#view'+views).fadeIn();
}
function closeOrder(e){
    e.preventDefault();
    $('.orderWrap').fadeOut();
}

function cancelOrder(e){
    e.preventDefault();
     var order_id = e.target.id;
     $('#view'+order_id).fadeOut();
       let datas = {
          "orderId": order_id,
  "orderHash": "ascascasc"
    };
     fetch('https://api.byzanti.ne/orderCancel?api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N', {
     method: 'POST',headers: {
  //  'Accept': 'application/json',
    'Content-Type': 'application/json',
  },  body: JSON.stringify(datas)})
        .then(response => response.json())
        .then(data => window.location.reload());
        
}

class tradingHead extends Component{
     
	static defaultProps = {
		symbol: c+':EOS',
		interval: '60',
		containerId: 'tv_chart_container',
		libraryPath: '/charting_library/',
		chartsStorageUrl: 'https://saveload.tradingview.com',
		chartsStorageApiVersion: '1.1',
		clientId: 'tradingview.com',
		userId: 'public_user_id',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
    };
    
    constructor(props) {
        super(props);
    
        this.state = {
          tricker: [],
          orders: [],
          orderBook: [],
          orderBooks: [],
          orderBookss: [],
          tacker: [],
          blc: [],
          apil:'SEED',
          
          Orders: [],
          OrderSells: [],
          tradebook: [],
          useraccount:'',
          colors: [],
          logo: [],
        };
         this.refresh_data = this.refresh_data.bind(this);
      }
refresh_data()
{
     
         var url = new URL(window.location.href);
         var c = url.searchParams.get("opt");
      
        var API = 'https://api.byzanti.ne/ticker?symbol='+c+'&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APISs = 'https://api.byzanti.ne/orderBook?symbol='+c+'&side=BUY&size=150&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APIS = 'https://api.byzanti.ne/orderBook?symbol='+c+'&side=BUY&size=11&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APISS = 'https://api.byzanti.ne/orders?symbol='+c+'&side=BUY&size=22&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var orderTaker = 'https://api.byzanti.ne/tradebook?symbol='+c+'&size=100&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        fetch(API)
        .then(response => response.json())
        .then(data => {this.setState({ tricker: data }); });
        
        fetch(APISS)
        .then(response => response.json())
        .then(data => {this.setState({ orders: data }); });
        
        fetch(APIS)
        .then(response => response.json())
        .then(data => {this.setState({ orderBook: data['asks'], orderBooks: data['bids'] }); });
        
        fetch(APISs)
        .then(response => response.json())
        .then(data => {this.setState({ orderBookss: data['asks'], orderBookss: data['bids'] }); });
        
        fetch(orderTaker)
        .then(response => response.json())
        .then(data => {this.setState({ tacker: data }); });

        fetch('https://api.byzanti.ne/exbalance?account=taker1&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N')
        .then(response => response.json())
        .then(data => {this.setState({blc:(data[0].amount/10000)}); });
      
        var tradebook = 'https://api.byzanti.ne/tradebook?symbol='+c+'&size=10&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var NAPI = 'https://api.byzanti.ne/ordersByUser?user=taker1&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var OrderSell = 'https://api.byzanti.ne/orders?symbol=IQ&side=SELL&size=100&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        fetch(NAPI)
        .then(response => response.json())
        .then(data => {this.setState({ Orders: data }); });
        fetch(OrderSell)
        .then(response => response.json())
        .then(data => {this.setState({ OrderSells: data }); });
        
        fetch(tradebook)
        .then(response => response.json())
        .then(data => {this.setState({ tradebook: data }); });
        $('.sellAlart').hide();
        $('#price').val('');
        $('#buyPrice').val('');
        $('#sellPrice').val('');
        $('#priceTwo').val('');
        $('#BuyPricetwo').val('');
        $('#sellPricetwo').val('');

}
    

    
    componentDidMount() {
      /*   var url = new URL(window.location.href);
        console.log(url.href.substr(url.href.lastIndexOf('/') + 1));*/
        const widgetOptions = {
			debug: false,
			symbol: this.props.symbol,
			datafeed: Datafeed,
			interval: this.props.interval,
			container_id: this.props.containerId,
			library_path: this.props.libraryPath,
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: this.props.chartsStorageUrl,
			charts_storage_api_version: this.props.chartsStorageApiVersion,
			client_id: this.props.clientId,
			user_id: this.props.userId,
			fullscreen: this.props.fullscreen,
			autosize: this.props.autosize,
			studies_overrides: this.props.studiesOverrides,
			overrides: {
				"mainSeriesProperties.showCountdown": true,
				"paneProperties.background": "#52565a",
				"paneProperties.vertGridProperties.color": "#363c4e",
				"paneProperties.horzGridProperties.color": "#363c4e",
				"symbolWatermarkProperties.transparency": 90,
				"scalesProperties.textColor" : "#AAA",
				"mainSeriesProperties.candleStyle.wickUpColor": '#336854',
				"mainSeriesProperties.candleStyle.wickDownColor": '#7f323f',
			}
        };

		window.TradingView.onready(() => {
			const widget = window.tvWidget = new window.TradingView.widget(widgetOptions);

			widget.onChartReady(() => {
				console.log('Chart has loaded!')
			});
        });
        
        var url = new URL(window.location.href);
         var c = url.searchParams.get("opt");
      
        var API = 'https://api.byzanti.ne/ticker?symbol='+c+'&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APISs = 'https://api.byzanti.ne/orderBook?symbol='+c+'&side=BUY&size=150&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APIS = 'https://api.byzanti.ne/orderBook?symbol='+c+'&side=BUY&size=11&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var APISS = 'https://api.byzanti.ne/orders?symbol='+c+'&side=BUY&size=22&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var orderTaker = 'https://api.byzanti.ne/tradebook?symbol='+c+'&size=100&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        fetch(API)
        .then(response => response.json())
        .then(data => {this.setState({ tricker: data }); });
        
        fetch(APISS)
        .then(response => response.json())
        .then(data => {this.setState({ orders: data }); });
        
        fetch(APIS)
        .then(response => response.json())
        .then(data => {this.setState({ orderBook: data['asks'], orderBooks: data['bids'] }); });
        
        fetch(APISs)
        .then(response => response.json())
        .then(data => {this.setState({ orderBookss: data['asks'], orderBookss: data['bids'] }); });
        
        fetch(orderTaker)
        .then(response => response.json())
        .then(data => {this.setState({ tacker: data }); });

        fetch('https://api.byzanti.ne/exbalance?account=taker1&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N')
        .then(response => response.json())
        .then(data => {this.setState({blc:(data[0].amount/10000)}); });
      
        var tradebook = 'https://api.byzanti.ne/tradebook?symbol='+c+'&size=10&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var NAPI = 'https://api.byzanti.ne/ordersByUser?user=taker1&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        var OrderSell = 'https://api.byzanti.ne/orders?symbol=IQ&side=SELL&size=100&api_key=FQK0SYR-W4H4NP2-HXZ2PKH-3J8797N';
        fetch(NAPI)
        .then(response => response.json())
        .then(data => {this.setState({ Orders: data }); });
        fetch(OrderSell)
        .then(response => response.json())
        .then(data => {this.setState({ OrderSells: data }); });
        
        fetch(tradebook)
        .then(response => response.json())
        .then(data => {this.setState({ tradebook: data }); });

        fetch('https://uberdex-admin.herokuapp.com/getColors')
        .then(response => response.json())
        .then(data => {this.setState({colors:data.theme_color}); this.setState({logo:'https://uberdex-admin.herokuapp.com/images/byzantine/'+data.logo}); });

    }


    render(){
        const { tricker } = this.state;
        const { orders } = this.state;
        const { orderBook } = this.state;
        const { orderBooks } = this.state;
        const { orderBookss } = this.state;
        const { tacker } = this.state;
        const { blc } = this.state;
       
        const { Orders } = this.state;
        const { OrderSells } = this.state;
        const { tradebook } = this.state;
       
        return(
            <div>
                
            <div className="wellcomBanner background"   style={{'background': this.state.colors}}>
                <div className="header  headerInners">
                    <div className="logo">
                        <a href="/"><img src={this.state.logo} className="App-logo" alt="logo" /></a>
                    </div>
                    <div className="menuSections">
                        <nav>
                            <ul>
                                <li><a href="/exchange/?opt=IQ">Exchange</a></li>
                                <li><a href="/market">Markets</a></li>
                                <li><a href="/contact">Supports</a></li>
                                <li id="signin"><a href="/"  onClick={handlesign}>Sign In</a></li>
                                <li id="signout"><a href="/"  onClick={handleSignout}>Sign out</a></li>
                                <li><a href="/" className="bgs"  onClick={handlePublic}>Get Started</a></li>
                            </ul>
                        </nav>
                        <div className="othersOptions">
                            <a href="/" className="fullscreen"><i className="fa fa-expand-arrows-alt"> </i></a>
                            <a href="/" className="smallscreen"><i className="fa fa-expand-arrows-alt"> </i></a>
                            <a href="#" className="lightT" onClick={handlelight}><i className="fa fa-lightbulb"> </i></a>
                            <a href="#" className="darkt" onClick={handledark}><i className="fa fa-lightbulb"> </i></a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="tradingCenter">
            <div className="tradingInner clearfix">

                <div className="leftSide">
                    <Trading />
                    <div className="lattestTrans">
                        <h4 className=" background" style={color}>Latest transactions</h4>
                        <table>
                            <thead>
                                <tr>
                                    <th>Price(EOS)</th>
                                    {tricker.map(hit => <th>{'Amount('+hit.symbol+')'} </th>  )}
                                    <th>Exchange</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tacker.map(tackers => 
                                    <tr>
                                        <td className={'plus '+tackers.assetBuy} id={tackers.tradeId}  onClick={tackerView}>{tackers.price}</td>
                                        <td>{tackers.amountBuy}</td>
                                        <td>{tackers.takerExchange}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="rightSide rightSideBottom">
                    <div className="calculators">
                        <h4 className=" background" style={color}>Limit Order <span>Balance : {this.state.blc}</span></h4>
                        <div className="clearfix">
                        <div id="tabss">
                            <div id="tabs1">
                                {tricker.map(hit =>
                                    <h5>Buy {hit.symbol} </h5>
                                )}
                                <label>Price <span></span> </label>
                                <input type="number" id="price" />
                                <label>Amount {tricker.map(hit =>
                                    <span>{hit.symbol} </span>
                                )}</label>
                                    <input type="hidden" id="buyPrices"  />
                                
                                <input type="number" id="buyPrice" onChange={changeSellPrice1} />
                                <label>Total  <span>EOS</span>
                                </label>
                                <input type="number"  id="sellPrice" onChange={changeSellPrice} />
                                <input type="submit" value="Signin to trade" onClick={handleBuy} className="background"   style={{'background': this.state.colors}} />
                            </div>

                            <div id="tabs2">
                                {tricker.map(hit =>
                                    <h5>Sell {hit.symbol} </h5>
                                )}
                                <label>Price <span></span> </label>
                                <input type="number"  id="priceTwo" />
                                <label>Amount {tricker.map(hit =>
                                    <span>{hit.symbol} </span>
                                )}</label>
                                <input type="hidden" id="BuyPricetwos"/>

                                <input type="hidden" id="ID"/>
                                <input type="hidden" id="assetbuy"/>
                                <input type="hidden" id="assetsell"/>
                                <input type="hidden" id="amountsell"/>
                                <input type="hidden" id="amountbuy"/>
                                <input type="hidden" id="prices"/>
                                <input type="hidden" id="maker"/>
                                <input type="hidden" id="makerexchange"/>
                                <input type="hidden" id="side"/>
                                <input type="hidden" id="apiType" />
                                <input type="number" id="BuyPricetwo"  onChange={changeBuyPrice1} />
                                <label>Total <span>EOS</span></label>
                                <input type="number" id="sellPricetwo" onChange={changeBuyPrice} />
                                <input type="submit"  onClick={handleSell} value="Signin to trade" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="rightOrders">
                        <h3 className=" background" style={color}>Orders Book</h3>
                        
                        <div id="tabs">
                            <ul>
                                <li><a href="#tabs-1">Depth</a></li>
                                <li><a href="#tabs-2">Buy</a></li>
                                <li><a href="#tabs-3">Sell</a></li>
                            </ul>
                            <div id="tabs-1">
                               <table>
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {orderBooks.map(bids => 
                                            <tr>
                                                <td className='minus' id={bids.price} data-id={bids.orderId} data-assetbuy={bids.assetSell} data-assetsell={bids.assetBuy} data-amountsell={bids.amountBuy} data-amountbuy={bids.amountSell} data-price={bids.price} data-maker={bids.useraccount} data-makerexchange={bids.source} data-side={bids.side}   onClick={handleClicks}>{parseFloat(bids.price).toFixed(4)}</td>
                                                <td id={bids.amountBuy}>{parseFloat(bids.amountBuy).toFixed(4)}</td>
                                                <td id={bids.amountSell}>{parseFloat(bids.amountSell).toFixed(4)}</td>
                                            </tr>
                                        )}
                                        {orderBook.map(ask => 
                                            <tr>
                                                <td className='plus' id={ask.price} data-id={ask.orderId} data-assetbuy={ask.assetSell} data-assetsell={ask.assetBuy} data-amountsell={ask.amountBuy} data-amountbuy={ask.amountSell} data-price={ask.price} data-maker={ask.useraccount} data-makerexchange={ask.source} data-side={ask.side} onClick={handleClick}>{parseFloat(ask.price).toFixed(4)}</td>
                                                <td id={ask.amountSell}>{parseFloat(ask.amountSell).toFixed(4)}</td>
                                                <td id={ask.amountBuy}>{parseFloat(ask.amountBuy).toFixed(4)}</td>
                                            </tr>
                                        )}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <div id="tabs-2">
                            <table className="tableScroll">
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                    <tbody>
                                        
                                        {orderBookss.map(ask => 
                                            <tr>
                                                <td className='plus' id={ask.price} data-id={ask.orderId} data-assetbuy={ask.assetSell} data-assetsell={ask.assetBuy} data-amountsell={ask.amountBuy} data-amountbuy={ask.amountSell} data-price={ask.price} data-maker={ask.useraccount} data-makerexchange={ask.source} data-side={ask.side} onClick={handleClick}>{parseFloat(ask.price).toFixed(4)}</td>
                                                <td id={ask.amountSell}>{parseFloat(ask.amountSell).toFixed(4)}</td>
                                                <td id={ask.amountBuy}>{parseFloat(ask.amountBuy).toFixed(4)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div id="tabs-3">
                            <table className="tableScroll">
                                    <thead>
                                        <tr>
                                            <th>Price(EOS)</th>
                                            {tricker.map(hit => <th>{hit.symbol} </th>  )}
                                            <th>Total(EOS)</th>
                                    </tr>
                                    </thead>
                                    
                                   
                                    <tbody>
                                        
                                        {orderBookss.map(bids => 
                                            <tr>
                                                <td className='minus' id={bids.price} data-id={bids.orderId} data-assetbuy={bids.assetSell} data-assetsell={bids.assetBuy} data-amountsell={bids.amountBuy} data-amountbuy={bids.amountSell} data-price={bids.price} data-maker={bids.useraccount} data-makerexchange={bids.source} data-side={bids.side}   onClick={handleClicks}>{parseFloat(bids.price).toFixed(4)}</td>
                                                <td id={bids.amountBuy}>{parseFloat(bids.amountBuy).toFixed(4)}</td>
                                                <td id={bids.amountSell}>{parseFloat(bids.amountSell).toFixed(4)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <div className="centerSideup">
                    <div className="centerSideInnerup">
                        <div>
                            
                            {Orders.map(order =>
                                
                                <div className="orderWrap" id={'view'+order.orderId}>
                                    <div className="orderView">
                                        <a href="/" className="closeView"  onClick={closeOrder}><i className="fa fa-times"></i></a>
                                        <h3>Order Detail</h3>
                                        <div className="viewBottom clearfix">
                                            <ul>
                                                <li><span>Account Name</span> <cite>{order.useraccount}</cite> </li>
                                                <li><span>Source</span> <cite>{order.source}</cite> </li>
                                                <li><span>Total</span> <cite>{order.amountBuy} {order.assetBuy}</cite> </li>
                                                <li><span>Price</span> <cite>{order.price}</cite> </li>
                                                <li><span>Fee Discount</span> <cite>{order.feediscount}</cite> </li>
                                                <li><span>Expires</span> <cite>{order.expires}</cite> </li>
                                                <li><span>Type</span> <cite>{order.type}</cite> </li>
                                                <li><span>Time stamp</span> <cite>{order.timestamp}</cite> </li>
                                                <li><span>Date</span> <cite>{order.created}</cite> </li>
                                                <li><span>Order Id</span> <cite className="tradeId">{order.orderId}</cite> </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> 
                            )}
                            
                        <div className="myOrders">
                                    
                            <h3>Open Orders</h3>
                            <table className="openOrder">
                                <thead>
                            
                                    <tr>
                                        <th>Coin</th>
                                        <th>Type </th>
                                        <th>Order Id </th>
                                        <th>Entrusted Time</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                        <th>Entrusted </th>
                                        <th>Status </th>
                                        <th>Account Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Orders.map(order =>{
                                        if(order.cancelled=='1')
                                        {
                                            var isCancel='Cancelled';
                                        }
                                        else
                                        {
                                            var isCancel='Active';
                                        }
                                        if(order.amountBuy>0)
                                        {
                                            var amountToShow=order.amountBuy;
                                        }
                                        else
                                        {
                                            var amountToShow=order.amountSell;
                                        }
                                        
                                        var url = new URL(window.location.href);
                                        var c = url.searchParams.get("opt");
                                        
                                        if(order.assetBuy==c || order.assetSell==c)
                                        {
                                            return   <tr>
                                                <td className={'plus '+order.assetBuy}  id={order.orderId}  onClick={orderView} >{order.assetBuy}</td>
                                                <td id={order.orderId}  onClick={orderView}>{order.side}</td>
                                                <td id={order.orderId}  onClick={orderView}>{order.orderId}</td>
                                                <td id={order.orderId}  onClick={orderView}>{order.created}</td>
                                                <td id={order.orderId}  onClick={orderView}>{parseFloat(order.price).toFixed(4)}</td>
                                                <td id={order.orderId}  onClick={orderView}>{parseFloat(amountToShow).toFixed(4)}</td>
                                                <td id={order.orderId}  onClick={orderView}>Yes</td>
                                                <td id={order.orderId}    ><a href="javascript:void(0)" id={order.orderId} onClick={cancelOrder}>{isCancel}</a></td>
                                                <td id={order.orderId}  onClick={orderView}>{order.useraccount}</td>
                                            </tr>
                                        }
                                        
                                    
                                    
                                    } )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="history">
                <div>
                
                    <div className="myOrders">
                            <h3>Orders History</h3>
                            <table>
                                <thead>
                            
                                    <tr>
                                        <th>Coin</th>
                                        <th>Type </th>
                                        <th>Trade ID </th>
                                        <th>Entrusted Time</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                        <th>Timestamp</th>
                                        <th>Entrusted </th>
                                        <th>Taker </th>
                                        <th>Maker </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {tradebook.map(tradebooks =>{
                                    if(tradebooks.taker=='taker1')
                                    {
                                        if(tradebooks.assetBuy=='EOS')
                                        {
                                            var sides= 'Sell';
                                        }
                                        else
                                        {
                                            var sides='Buy';
                                        }
                                        return <tr>
                                        <td className={'plus '+tradebooks.assetBuy}  id={tradebooks.tradeId}  onClick={tackerViews}  >{tradebooks.assetBuy}</td>
                                        <td id={tradebooks.tradeId}>{sides}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.tradeId}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.created}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.price}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.amountBuy}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.created}</td>
                                        <td id={tradebooks.tradeId}>Yes</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.taker}</td>
                                        <td id={tradebooks.tradeId}>{tradebooks.maker}</td>
                                    </tr>
                                    }
                                    
                                }
                                    )}
                                </tbody>
                            </table>
                        
                    </div>
        
                    {tradebook.map(tradebooks =>
                            
                            <div className="tradeWrap" id={'views'+tradebooks.tradeId}>
                                <div className="tradeView">
                                    <a href="/" className="closeView"  onClick={closeViews}><i className="fa fa-times"></i></a>
                                    <div className="viewTop">
                                        <ul>
                                            <li><span>Price</span>{tradebooks.price} EOS</li>
                                            <li><span>Volume</span>{tradebooks.amountBuy} {tradebooks.assetBuy}</li>
                                            <li><span>Total</span>{tradebooks.amountSell} EOS</li>
                                            <li><span>Date</span> {tradebooks.created}</li>
                                        </ul>
                                    </div>
                                    <div className="viewBottom clearfix">
                                        <ul>
                                            <li><h3>Maker</h3></li>
                                            <li><span>EOS Account Name</span> <cite>{tradebooks.maker}</cite> </li>
                                            <li><span>Total</span> <cite>{tradebooks.amountBuy} {tradebooks.assetBuy}</cite> </li>
                                            <li><span>Fee</span> <cite>{tradebooks.makerFee} {tradebooks.assetBuy}</cite> </li>
                                            <li><span>Maker Exchange</span> {tradebooks.makerExchange} <cite></cite> </li>
                                            <li><span>Time stamp</span> <cite>{tradebooks.timestamp}</cite> </li>
                                            <li><span>Trade Id</span> <cite className="tradeId">{tradebooks.tradeId}</cite> </li>
                                            
                                        </ul>
                                        
                                        <ul>
                                            <li><h3>Taker</h3></li>
                                            <li><span>EOS Account Name</span> <cite>{tradebooks.taker}</cite> </li>
                                            <li><span>Total</span> <cite>{tradebooks.amountSell} EOS</cite> </li>
                                            <li><span>Fee</span> <cite>{tradebooks.takerFee} EOS</cite> </li>
                                            <li><span>Taker Exchange</span> <cite>{tradebooks.takerExchange}</cite> </li>
                                            <li><span>Time stamp</span> <cite>{tradebooks.timestamp}</cite> </li>
                                            <li><span>Trade Id</span> <cite className="tradeId">{tradebooks.tradeId}</cite> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        )}
                </div>
                </div>
                <div className="centerSide">
                    <div className="centerSideInner">
                        <div id={ this.props.containerId } className={ 'TVChartContainer' }></div>
                    </div>
                </div>

                <div className="clearfix"></div>
                <div className="sellAlart firstA">
                    <div className="innrs">
                        <h3 id="msg"></h3>
                        <p id="contentToShow"></p>
                        <a href="javascript:void(0)" onClick={this.refresh_data} className="closeView">Ok</a>
                    </div>
                </div>
                
                <div className="introAlart">
                    <div className="innrs">
                        <h3>Introduction</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                        <a href="javascript:void(0)" onClick={closeIntro} className="closeView">Ok</a>
                    </div>
                </div>

                <div className="container clearfix">
                    {tacker.map(tackers =>
                    
                        <div className="tradeWrap" id={'view'+tackers.tradeId}>
                            <div className="tradeView">
                                <a href="/" className="closeView"  onClick={closeView}><i className="fa fa-times"></i></a>
                                <div className="viewTop">
                                    <ul>
                                        <li><span>Price</span>{tackers.price} EOS</li>
                                        <li><span>Volume</span>{tackers.amountBuy} {tackers.assetBuy}</li>
                                        <li><span>Total</span>{tackers.amountSell} EOS</li>
                                        <li><span>Date</span> {tackers.created}</li>
                                    </ul>
                                </div>
                                <div className="viewBottom clearfix">
                                    <ul>
                                        <li><h3>Maker</h3></li>
                                        <li><span>EOS Account Name</span> <cite>{tackers.maker}</cite> </li>
                                        <li><span>Total</span> <cite>{tackers.amountBuy} {tackers.assetBuy}</cite> </li>
                                        <li><span>Fee</span> <cite>{tackers.makerFee} {tackers.assetBuy}</cite> </li>
                                        <li><span>Maker Exchange</span> {tackers.makerExchange} <cite></cite> </li>
                                        <li><span>Time stamp</span> <cite>{tackers.timestamp}</cite> </li>
                                        <li><span>Trade Id</span> <cite className="tradeId">{tackers.tradeId}</cite> </li>
                                    </ul>
                                    
                                    <ul>
                                        <li><h3>Taker</h3></li>
                                        <li><span>EOS Account Name</span> <cite>{tackers.taker}</cite> </li>
                                        <li><span>Total</span> <cite>{tackers.amountSell} EOS</cite> </li>
                                        <li><span>Fee</span> <cite>{tackers.takerFee} EOS</cite> </li>
                                        <li><span>Taker Exchange</span> <cite>{tackers.takerExchange}</cite> </li>
                                        <li><span>Time stamp</span> <cite>{tackers.timestamp}</cite> </li>
                                        <li><span>Trade Id</span> <cite className="tradeId">{tackers.tradeId}</cite> </li>
                                    </ul>
                                </div>
                            </div>
                        </div> 
                    )}
                </div>
            </div>
            </div>
            </div>
        )
    }
}

export default tradingHead;