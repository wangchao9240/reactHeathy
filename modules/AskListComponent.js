var React = require('react');
var moment = require('moment');

var AskListComponent = React.createClass({
  getDefaultProps: function() {
    return {
      AskListUrl: 'http://localhost/ask-list.php',
      AskDetailUrl: 'http://localhost/ask-detail.php',
      aksPrefix: 'http://tnfs.tngou.net/img'
    }
  },
  getInitialState: function() {
    return {
      askList: [],
      total:0,
      detail: '',
      hasAjaxed: []
    }
  },
  componentWillReceiveProps: function(nextProps) {
    var _this = this;
    var categoryId = nextProps.params.id;
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
    if( propsPage !== nextPropsPage ) {
      $.ajax({
        url: this.props.AskListUrl,
        dataType: 'JSON',
        data: {
          id: categoryId,
          page: nextPropsPage
        }
      })
      .then(function(res) {
        _this.setState({
          askList: res.tngou,
          total: res.total
        })
      })
    }
  },
  handlerAskDetail: function(e) {
    var id = e.target.getAttribute('data-id');
    var _this = this;

    var needAjax = true;
    var hasAjaxed = this.state.hasAjaxed;

    hasAjaxed.forEach(function(item, index) {
      if (item.id == id) {
        _this.setState({
          detail: item
        })
        needAjax = false;
      }
    })

    if (needAjax) {
      // ------ajax请求-------
      $.ajax({
        url: this.props.AskDetailUrl,
        dataType: 'JSON',
        data: {
          id: id
        }
      })
      .then(function(res) {
        console.log('ajax');
        _this.setState({
          detail: res
        })
        _this.state.hasAjaxed.push(res);
      })
    }


  },
  getTime: function(timeStack) {
    return moment(timeStack).format('YYYY-MM-DD HH:mm:ss')
  },
	render:function(){
    var size = {
      imgSize: {
        width: '200px',
        height: '200px'
      },
      widthSmall: {
        width: '20%'
      },
      widthBig: {
        width: '80%'
      },
      maxSize: {
        maxWidth: '100%'
      }
    };

    var askList = this.state.askList;
    var askItem = [];
    var _this = this;
    if (askList) {
      askList.forEach(function(item, index) {
        askItem.push(
          <tr key={index}>
            <td style={size.widthSmall}>
              <img style={size.imgSize} src={ _this.props.aksPrefix + item.img }/>
            </td>
            <td style={size.widthBig}>
              <h2>{ item.title }</h2>
              <span className="badge">{_this.getTime(item.time)}</span>
              <div className="lead">
                {item.description}
              </div>
              <button type="button" onClick={_this.handlerAskDetail} data-id={item.id} className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                查看详情
              </button>
              <p className="col-md-offset-7 text-right">{item.keywords}</p>
            </td>
          </tr>
        )
      })
    }

    var detail = this.state.detail;
    var imgUrl = this.props.aksPrefix + detail.img;
    if(!detail) {
      imgUrl = '';
    }
		return (
			<div>
		    <div className="table-responsive">
          <table className="table table-striped">
            <tbody>
              {askItem}
            </tbody>
          </table>
         

          <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                  <h4 className="modal-title" id="myModalLabel">
                    {detail.title}
                    <span className="badge">{_this.getTime(detail.time)}</span>
                  </h4>
                </div>
                <div className="modal-body">
                  <img className="center-block" style={size.maxSize} src={ imgUrl } />
                  <p dangerouslySetInnerHTML={{__html: detail.message}}></p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>



        </div>
			</div>
		)
	}
})

module.exports = AskListComponent;