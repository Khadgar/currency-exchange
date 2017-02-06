import React from 'react';
import {render} from 'react-dom';

function makeApiCall() {
    var myHeaders = new Headers({
        "Cookie":"preferredLanguage=hu; cookie.ECB=!P3JfCfllLvsn+AzViMJddZBG69fgZQYMDXXNkMmRerok9Cl2XYuZEXZhdSqbHRAgj3Jf52md5U2IvZY=",
        "Host":"www.ecb.europa.eu",
        "If-None-Match":"120f5-547a177fe1400",
        "Upgrade-Insecure-Requests":"1"
    });

    var myInit = {
        method: 'GET',
        headers: myHeaders,
        mode:'opaque'
    };
    var url = "http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml";
    return fetch(url, myInit);
}

var ApplicationWrapper = React.createClass({

    loadCurrency: function(name) {
        makeApiCall().then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }).then(function(response) {
            console.log(response);
            // response.json().then(function(json) {
            //     console.log(json)
            //     this.setState({
            //         data: json,
            //     });
            //     console.log(this.state);
            // }.bind(this));
        }.bind(this))
            .catch(function(error) {
                console.log(error);
            }.bind(this));
    },

    init: function(){
        this.loadCurrency();
    },

    getInitialState: function() {
        this.init();
        return {
            data: [],
        };
    },

  	render: function() {
    	return( 
	    	<div className="applicationWrapper container-fluid">

	    	</div>);
		}
});

module.exports = ApplicationWrapper;