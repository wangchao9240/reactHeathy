var React = require('react');

var HeaderComponent = require('./HeaderComponent.js');
var FooterComponent = require('./FooterComponent.js');


var App = React.createClass({
	render:function(){
		return (
			<div>
				<HeaderComponent/>
  		  <div className="container marketing">
  		  	{this.props.children}
        </div>
  		  <FooterComponent/>
			</div>
		)
	}
})

module.exports = App;