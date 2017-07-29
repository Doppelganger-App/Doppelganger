//include React
var React = require("react");

//create Logo component
var Logo = React.createClass({
	render: function() {
		return (
		    <div className="container">
		        <div className="row">      
		          <div className="col l12 center-align" id="logoCol">
		            <img id="logo" src="assets/images/blackbkgdlogo.gif" />
		            <a href="/register" className="chip waves-effect red white-text darken-2 lighten-text-2" id="signup">Create your Doppelgänger</a>
		          </div>
		        </div>
		    </div>
		);
	}
});

//export component
module.exports = Logo;