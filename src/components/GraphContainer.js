import React from 'react';
import {render} from 'react-dom';
import Rickshaw from 'rickshaw';

var GraphContainer = React.createClass({
    componentDidMount: function() {
        this.graph = new Rickshaw.Graph({
            element: document.querySelector("#chart"),
            width: 500,
            height: 200,
            renderer: "bar",
            series: [{
                color: 'steelblue',
                data: [{ x: 0, y: 0 }],

            }]
        });

        var hoverDetail = new Rickshaw.Graph.HoverDetail({
            graph: this.graph,
            // formatter: function(series, x, y) {
            //     var date = '<span class="date">ASDASDASDASDasd</span>';
            //     var content = date;
            //     return content;
            // },
            xFormatter: function(x) {
                return "";
            },
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

    mapHistory: function(currency, data) {
        var mapped = []
        if (this.props.Data.response) {
            mapped = this.props.Data.response.map(function(el, index) {
                var obj = {}
                obj.time = el.time;
                obj.value = el.Cube.filter(function(el) {
                    return el.currency === currency;
                })[0].rate;
                return obj;
            });
        }
        return mapped;
    },
    change: function(event) {

        var graphData = this.mapHistory(event.target.value, this.props.Data);
        graphData = graphData.map(function(el, index) {
            return {
                x: index,
                y: parseFloat(el.value),
                t: el.time
            };
        });
        console.log(graphData)

        this.graph.series[0].data = graphData;
        this.graph.series[0].name = event.target.value;

    
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