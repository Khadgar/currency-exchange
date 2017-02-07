import React from 'react';
import {render} from 'react-dom';

var ResultContainer = React.createClass({
     
  	render: function() {
    	return( 
	    	<div className="resultContainerWrapper">
                {this.props.Result}
	    	</div>);
		}
});

module.exports = ResultContainer;