var React 		= require('react');
var ReactDOM 	= require('react-dom');


//引入React-router路由部分的内容
var Router 		= require('react-router').Router; //路由管理器
var Route 		= require('react-router').Route; //单个的路由
var hashHistory = require('react-router').hashHistory; //url中的hash值的历史记录
var IndexRoute  = require('react-router').IndexRoute; // 首页路由

//引入需要处理的子模块内容
var App 		= require('./modules/App.js');
var Home 		= require('./modules/Home.js');
var FoodListComponent= require('./modules/FoodListComponent.js');
var FoodDetailComponent = require('./modules/FoodDetailComponent.js');
var AskListComponent 		= require('./modules/AskListComponent.js');


var Index = React.createClass({
	render:function(){
		return (
			<Router history={hashHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="/askList/:id(/:page)" component={AskListComponent} />
					<Route path="/foodlist/:categoryId(/:page)" component={FoodListComponent} >
						<Route path="/fooddetail/:categoryId/:id(/:page)" component={FoodDetailComponent} />
					</Route>
				</Route>
			</Router>
		)
	}
})

ReactDOM.render(<Index/>,document.getElementById('app'));