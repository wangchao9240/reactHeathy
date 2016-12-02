var React = require('react');
var Link = require('react-router').Link; //设置react-router的链接操作


var NavLink = React.createClass({
	render:function(){
		return (
			<Link {...this.props} activeClassName="active" />
		)
	}
})

module.exports = NavLink;