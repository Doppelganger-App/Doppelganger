// include React
var React = require("react");

//creating Header component
var Header = React.createClass({
	render: function() {
	    return (
	    <nav>
	        <div className="nav-wrapper">
	            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
	            <a href="/" className="brand-logo masthead"><img src="assets/images/blackbkgdlogo.gif" id="logoImg" alt="head" /></a>
	            <ul id="nav-mobile" className="left hide-on-med-and-down">
	                <li id="title"><a href="/">Doppelgänger</a></li> 
	                <li><a href="/about">About</a></li>
	            </ul>	            
	            <ul id="nav-mobile" className="right hide-on-med-and-down">
	                <li><a href="/login">Login</a></li>
	            </ul>
	            <ul className="side-nav" id="mobile-demo">
	                <li><a href="/login">Login</a></li>
	                <li><a href="/about">About</a></li>
	            </ul>
	        </div>
	    </nav>	
	    );
    }
});    

module.exports = Header;