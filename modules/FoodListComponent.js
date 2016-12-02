var React = require('react');
var Link = require('react-router').Link;
var NavLink = require('./NavLink');

var FoodListComponent = React.createClass({
	getDefaultProps: function() {
		return {
			foodUrl: 'http://localhost/food-list.php',
			foodPrefix: 'http://tnfs.tngou.net/img'
		}
	},
	getInitialState: function() {
		return {
			foodList: [],
			total: 0,
			categoryId: '',
			page: ''
		}
	},
	componentWillReceiveProps: function(nextProps) {
		var _this = this;
		var categoryId = nextProps.params.categoryId;
		// var page = nextProps.params.page || 1;
		var nextPropsPage = "1";
		var propsPage = 1;
		// 判断当前页面的属性值
		if (this.props.params.page != undefined ) {
			propsPage = parseInt(this.props.params.page);
		}
		// 判断下一个页面的属性值
		if (nextProps.params.page != undefined ) {
			nextPropsPage = parseInt(nextProps.params.page);
		}
		if ( propsPage !== nextPropsPage ) {
			$.ajax({
				url: this.props.foodUrl,
				dataType: 'JSON',
				data: {
					id: categoryId,
					page: nextPropsPage
				}
			})
			.then(function(res) {
				console.log('ajax')
				_this.setState({
					foodList: res.tngou,
					total: res.total,
					categoryId: categoryId,
					page: nextPropsPage
				})
			})
		}
	},
	render:function(){

		var imgSize = {
      size: {
        width: '140px',
        height: '140px'
      }
    }
    // 进行列表的排列操作

    // 这里通过双循环嵌套的方法，在rowList数组中
    // 拿到最后的列表结果
    var rowList = [];
    
    var lists = this.state.foodList;
    if(lists) {
      var rowList = [];

      var listLen = lists.length;
      for(var i = 0; i < Math.ceil(listLen/3); i++) {
        var colList = [];
        for(var j = 0; j < 3; j++) {
          var index = i*3 +j;
          if(index < listLen) {
            var imgUrl = this.props.foodPrefix + lists[index].img;

            colList.push(
              <div className="col-lg-4" key={index}>
                <img className="img-circle imgBox" style={imgSize.size} src={imgUrl} 
                alt="Generic placeholder image"/>
                <h2>{lists[index].name}</h2>
                <p>{lists[index].description}</p>
                <p><NavLink className="btn btn-default" to={ '/fooddetail/' + this.state.categoryId + '/' + lists[index].id + '/' + this.state.page } role="button">View details &raquo;</NavLink></p>
              </div>
            )
          }
        }
        rowList.push(
          <div className="row" key={i}>
            {colList}
          </div>
        )
      };
    }


    // 进行分页操作
    var total = this.state.total;
    var pageMaxSize = Math.ceil(total/30);
    var pageList = [];
    for (var i = 1; i <= pageMaxSize; i++) {
      pageList.push(
        <li key={i}>
          <NavLink to={'/foodList/' + this.state.categoryId + '/' + i }>{i}</NavLink>
        </li>
      )
    };

    var pageContent = (
      <nav>
        <ul className="pagination">
          {pageList}
        </ul>
      </nav>
    )

		return (
			<div>
        <div className="col-md-7">
          {pageContent}
  
          {rowList}
        </div>
        <div className="col-md-5">
				  {this.props.children}
        </div>  

			</div>
		)
	}
})

module.exports = FoodListComponent;