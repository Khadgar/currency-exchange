import React from 'react';
import {render} from 'react-dom';
import Rickshaw from 'rickshaw';

var GraphContainer = React.createClass({
    componentDidMount: function() {
        this.graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            width: 300,
            height: 200,
            series: [{
                color: 'steelblue',
                data: [{
                    x: 0,
                    y: 40
                }, {
                    x: 1,
                    y: 49
                }, {
                    x: 2,
                    y: 38
                }, {
                    x: 3,
                    y: 30
                }, {
                    x: 4,
                    y: 32
                }]
            }]
        });
        this.graph.render();
    },
    getCurrencyList: function(data) {
        if(data.response){
            var node = data.response[0].Cube.map(function(part, index) {
                return <option key={index} value={part.currency}>{part.currency}</option>;
            });
        }
        return node;
    },
    change: function(event) {
        console.log({
            value: event.target.value
        });
        this.graph.series[0].data = [{
            x: 0,
            y: 10
        }, {
            x: 1,
            y: 20
        }, {
            x: 2,
            y: 30
        }, {
            x: 3,
            y: 40
        }, {
            x: 4,
            y: 50
        }]
        this.graph.update();
    },
     
  	render: function() {

  		var node = this.getCurrencyList(this.props.Data);
    	return( 
	    	<div className="graphContainerWrapper">
                <div className="currencies">
                    <select ref="currency" onChange={this.change}>{node}</select>
                </div>
                <div id="chart"></div>
	    	</div>);
		}
});

module.exports = GraphContainer;