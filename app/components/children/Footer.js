//include React
var React = require("react");

//create Footer component
var Footer = React.createClass({
    render: function() {
        return (
	        <footer className="page-footer" style="background-color: black;">
	          <div className="footer-copyright">
	            <div className="container">
	            © 2017 Doppelgänger Team - to learn more about us, check out our <a href="/about">About</a> page.
	            </div>
	          </div>
	        </footer>
        )
    }

});

module.exports = Footer;