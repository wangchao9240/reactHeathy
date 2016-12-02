var React = require('react');

var FooterComponent = React.createClass({
  render:function(){
    return (
      <div>
        <div className="container marketing">
          <footer>
            <p className="pull-right"><a href="#">Back to top</a></p>
            <p>&copy; 2014 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
          </footer>
        </div>
      </div>
    )
  }
})

module.exports = FooterComponent;