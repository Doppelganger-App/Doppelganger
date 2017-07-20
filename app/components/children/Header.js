// include React
var React = require("react");

//creating Header component
var Header = React.createClass({
	render: function() {
	    return (
	    <nav style="background-color: black;">
	        <div className="nav-wrapper">
	            <a href="#" className="brand-logo masthead"><img src="public/assets/images/head_03.png" style="width: 60px" id="logoImg" alt="head" />  Doppelgänger</a>
	            <ul id="nav-mobile" className="right hide-on-med-and-down">
	                <li><a>Login</a></li>
	            </ul>
	        </div>
	    </nav>	
	    )
    }
});    

module.exports = Header;