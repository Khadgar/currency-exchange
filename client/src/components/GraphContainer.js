import React from 'react';
import { render } from 'react-dom';
import Rickshaw from 'rickshaw';

var GraphContainer = React.createClass( {

  componentWillReceiveProps: function ( nextProps ) {
    this.updateChart( "USD", nextProps.Data );
  },

  componentDidMount: function () {
    this.graph = new Rickshaw.Graph( {
      element: document.querySelector( "#chart" ),
      width: 500,
      height: 200,
      min: "auto",
      renderer: "line",
      series: [
        {
          color: 'steelblue',
          data: [],
        }
      ]
    } );

    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: this.graph,
      xFormatter: function ( x ) {
        return this.graph.series[0].data[x].t;
      }.bind( this )
    } );
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

  change: function ( event ) {
    this.updateChart( event.target.value, this.props.Data )
  },

  updateChart: function ( currency, data ) {
    if ( data.response ) {
      var graphData = this.mapHistory( currency, data );
      this.graph.series[0].data = graphData;
      this.graph.series[0].name = currency;
      var min = graphData.reduce( function ( p, v ) {
        return (p.y < v.y ? p.y : v.y);
      } );
      this.graph.update();
    }
  },

  mapHistory: function ( currency, data ) {
    var mapped = []
    if ( data.response ) {
      mapped = data.response.map( function ( el, index ) {
        var obj = {}
        obj.time = el.time;
        obj.value = el.Cube.filter( function ( el ) {
          return el.currency === currency;
        } )[0].rate;
        return obj;
      } );
    }
    mapped = mapped.map( function ( el, index ) {
      return {
        x: index,
        y: parseFloat( el.value ),
        t: el.time
      };
    } );
    return mapped;
  },

  render: function () {

    var node = this.getCurrencyList( this.props.Data );
    return (
    <div className="graphContainerWrapper">
      <div className="currencies">
        <select id="dd" ref="currency" onChange={ this.change } className="selectBox">
          { node }
        </select>
        VS EUR
      </div>
      <div id="chart" className="chartContainer"></div>
    </div>);
  }
} );

module.exports = GraphContainer;
