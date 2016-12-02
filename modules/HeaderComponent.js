var React = require('react');
var NavLink = require('./NavLink.js');

var HeaderComponent = React.createClass({
  getDefaultProps: function() {
    return{
      foodUrl: 'http://localhost/food-categories.php',
      askUrl: 'http://localhost/ask-categories.php'
    }
  },
  getInitialState: function() {
    return {
      foodCategory: [],
      askCategory: []
    }
  },
  componentWillMount: function() {
    var _this = this;
    // ajax线性调用
    $.when($.ajax(this.props.foodUrl), $.ajax(this.props.askUrl))
    .done(function(foodCategory, askCategory) {
      _this.setState({
        foodCategory: JSON.parse(foodCategory[0]).tngou,
        askCategory: JSON.parse(askCategory[0]).tngou,
      })
    })
  },
  // 封装分类函数
  showCategory: function(categories, linkTo) {
    var cates = [];
    if(categories) {
      var foodCates = [];
      var catesLen = categories.length;
      for(var i = 0; i < catesLen; i++) {
        cates.push(
          <li key={i}><NavLink to={'/' + linkTo+ '/' + categories[i].id}>{categories[i].name}</NavLink></li>
        )
      }
    }
    return cates;
  },
  render:function(){
    return (
      <div>
        <div className="navbar-wrapper">
          <div className="container">
    
            <nav className="navbar navbar-inverse navbar-static-top" role="navigation">
              <div className="container">
                <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="#">Project name</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                  <ul className="nav navbar-nav">
                    <li><NavLink to="/"  onlyActiveOnIndex>首页</NavLink></li>
                    <li><NavLink to="/about" >关于我们</NavLink></li>


                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">健康问答 <span className="caret"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        {this.showCategory(this.state.askCategory, 'askList')}
                      </ul>
                    </li>


                    <li className="dropdown">
                      <a href="#" className="dropdown-toggle" data-toggle="dropdown">健康菜谱 <span className="caret"></span></a>
                      <ul className="dropdown-menu" role="menu">
                        {this.showCategory(this.state.foodCategory, 'foodList')}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = HeaderComponent;