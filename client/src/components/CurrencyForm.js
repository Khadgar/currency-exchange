import React from 'react';
import { render } from 'react-dom';

var CurrencyForm = React.createClass( {

  handleSubmit: function () {
    var from = {
      value: this.refs.from.value.trim(),
      currency: this.refs.from_currency.value.trim()
    };
    var to = {
      currency: this.refs.to_currency.value.trim()
    };
    if ( from.value.length > 0 ) this.props.onSubmitForm( from, to );

    return false;
  },

  handleKeyPress: function ( event ) {
    if ( event.key == 'Enter' ) {
      this.handleSubmit();
    }
  },

  getCurrencyList: function ( data ) {
    if ( data.response ) {
      var node = data.response[0].Cube.map( function ( part, index ) {
        return <option key={ index } value={ part.currency }>
                 { part.currency }
               </option>;
      } );
    }
    return node;
  },

  render: function () {
    var node = this.getCurrencyList( this.props.Data );
    return (
    <div className="currencyFormWrapper">
      <div className="convertForm">
        <input type="text" className="textBox" placeholder="From" ref="from" onKeyPress={ this.handleKeyPress } />
        <div className="fromCurrency">
          <select className="selectBox" ref="from_currency">
            { node }
          </select>
        </div>
        <div className="to">to</div>
        <div className="toCurrency">
          <select className="selectBox" ref="to_currency">
            { node }
          </select>
        </div>
        <input type="submit" value="Convert" className="convertBtn" onClick={ this.handleSubmit } />
      </div>
    </div>);
  }
} );

module.exports = CurrencyForm;
