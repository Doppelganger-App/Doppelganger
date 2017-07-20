//include React
var React = require("react");

//inclue all the sub-components
var Header = require("./children/Header");
var Footer = require("./children/Footer");

//Helper for our AJAX calls 
var helpers = require("./utils/helpers");

//creating Main component
var Main = React.createClass({
  render: function() {
  	return (
  		<div className="container">
  	      <Header />
  	      {this.props.children}
  	      <Footer />
  	    </div>
  	);
  }
});

//export Main component back for use in other files
module.exports = Main;