var React = require('react');

var FoodDetailComponent = React.createClass({
	getDefaultProps: function() {
		return {
			foodDetailUrl: 'http://localhost/food-detail.php',
			foodPrefix: 'http://tnfs.tngou.net/img'
		}
	},
	getInitialState: function() {
		return {
			detail: '',
			haveAjax: []
		}
	},
	componentWillMount: function() {
		var _this = this;
		$.ajax({
			url: this.props.foodDetailUrl,
			data: {
				id: this.props.params.id
			},
			dataType: 'JSON'
		})
		.then(function(res) {
			_this.setState({
				detail: res
			})
			_this.state.haveAjax.push(res)
		})
	},
	componentWillReceiveProps: function(nextProps) {
		var _this = this;
		var needAjax = true;
		this.state.haveAjax.forEach(function(item, index) {
			if ( item.id == nextProps.params.id ){
				_this.setState({
					detail: item
				})
				needAjax = false;
			}
		})
		if(needAjax) {
			var _this = this;
			$.ajax({
				url: this.props.foodDetailUrl,
				data: {
					id: nextProps.params.id
				},
				dataType: 'JSON'
			})
			.then(function(res) {
				_this.setState({
					detail: res
				})
				_this.state.haveAjax.push(res)
			})
		}
	},
	render:function(){
		var detail = this.state.detail;
		var imgSize = {
      size: {
        width: '200px',
        height: '200px'
      }
    }
    var imgUrl = '';
    if (detail.img) {
			imgUrl = this.props.foodPrefix + detail.img
    }
		return (
			<div>
				<ul>
					<hr className="featurette-divider"/>
  	
        	<div className="row featurette">
        	  <div className="col-md-12">
        	    <img className="center-block featurette-image img-responsive" style={imgSize.size} src={ imgUrl } alt="Generic placeholder image" />
        	  </div>
        	  <div className="col-md-12">
        	    <h2 className="featurette-heading">{detail.name} <span className="text-muted">{detail.keywords}</span></h2>
        	    <p className="lead" dangerouslySetInnerHTML={{__html: detail.message}}></p>
        	  </div>
        	</div>
        	
        	<hr className="featurette-divider" />
				</ul>
			</div>
		)
	}
})

module.exports = FoodDetailComponent;