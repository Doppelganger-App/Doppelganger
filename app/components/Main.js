//include React
var React = require("react");

//inclue all the sub-components
var Footer = require("./children/Footer");
var Header = require("./children/Header");
var Logo = require("./children/Logo");

//creating Main component
var Main = React.createClass({
  render: function() {
  	return (
  		<div className="main-container">
  		  <Header />
  		  <div className="container">
            <Logo />
  	      </div>
  	      <Footer />
  	    </div>
  	);
  }
});

//export Main component back for use in other files
module.exports = Main;