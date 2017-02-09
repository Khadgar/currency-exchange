import React from 'react';
import { render } from 'react-dom';
import CurrencyForm from './CurrencyForm.js';
import ResultContainer from './ResultContainer.js';
import GraphContainer from './GraphContainer.js';

function makeApiCall() {
  var url = "http://localhost/getrates";
  return fetch( url );
}

var ApplicationWrapper = React.createClass( {

  loadCurrency: function ( from, to ) {
    makeApiCall().then( function ( response ) {
      if ( !response.ok ) {
        throw Error( response.statusText );
      }
      return response;
    } ).then( function ( response ) {
      response.json().then( function ( json ) {
        this.setState( {
          data: json,
          from: from,
          to: to,
          result: this.convertCurrency( json, from, to )
        } );
        console.log( this.state );
      }.bind( this ) );
    }.bind( this ) )
      .catch( function ( error ) {
        console.log( error );
      }.bind( this ) );
  },

  convertCurrency: function ( rates, from, to ) {
    var result = 0;
    if ( rates.response && from && to ) {
      var latestRates = rates.response[0].Cube;
      var fromLatestRates = latestRates.filter( function ( el ) {
        return el.currency === from.currency;
      } );
      var toLatestRates = latestRates.filter( function ( el ) {
        return el.currency === to.currency;
      } );
      result = parseFloat( from.value ) * (parseFloat( toLatestRates[0].rate ) / parseFloat( fromLatestRates[0].rate ));

    }
    return parseFloat( result ).toFixed( 2 );
  },

  init: function () {
    this.loadCurrency();
  },

  getInitialState: function () {
    this.init();
    return {
      data: [],
      from: '',
      to: '',
      result: ''
    };
  },

  render: function () {

    return (
    <div className="applicationWrapper container">
      <div className="row">
        <CurrencyForm Data={ this.state.data } onSubmitForm={ this.loadCurrency } />
      </div>
      <div className="row">
        <ResultContainer Result={ this.state.result } />
      </div>
      <div className="row">
        <GraphContainer Data={ this.state.data } />
      </div>
    </div>);
  }
} );

module.exports = ApplicationWrapper;
