// include React
var React = require("react");

//creating Header component
var Header = React.createClass({
	render: function() {
	    return (
	    <nav>
	        <div className="nav-wrapper">
	            <ul id="nav-mobile" className="left">
	                <li><a href="#" className="brand-logo masthead"><img src="assets/images/blackbkgdlogo.gif" id="logoImg" alt="head" /></a></li>
	                <li id="title"><a>Doppelgänger</a></li>
	            </ul>	            
	            <ul id="nav-mobile" className="right">
	                <li><a>Login</a></li>
	            </ul>
	        </div>
	    </nav>	
	    );
    }
});    

module.exports = Header;