//include React
var React = require("react");

//create Footer component
var Footer = React.createClass({
    render: function() {
        return (
		    <footer className="page-footer">
		      <div className="container">
		        <div className="row">
		           <h5 className="white-text center">Doppelgänger - The App that helps you find your undiscovered half...</h5>
		           <div className="col l4 m6 s8 offset-s2">
		              <p className="grey-text text-lighten-4">Have you ever wondered, what you are missing? If there is something else out there that might interest or excite you? What other people are talking and thinking about? You have come to the right place!</p>
		           </div>
		           <div className="col l4 m6 s8 offset-s2">
		              <p className="grey-text text-lighten-4">Doppelgänger gives you the tools to find new and exciting ideas, other points of view and lets you explore the world by providing you thought-provoking podcasts and inspiriational YouTube videos.</p>
		           </div>
		           <div className="col l4 m6 offset-m3 s8 offset-s2">
		             <p className="grey-text text-lighten-4">The way to your new and improved self is just a click away! Sign up, answer our short questionnaire and begin seeing the world through the eyes of "the other".</p>
		           </div>
		        </div>
		      </div>
		      <div className="footer-copyright center-align">
		        <div className="container">
		        © 2017 Doppelgänger Team - to learn more about us, check out our <a href="/team.html">About</a> page.
		        </div>
		      </div>
		    </footer>
        );
    }
});

module.exports = Footer;