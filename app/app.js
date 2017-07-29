//Include the main React dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Grab the Routes
var Main = require("./components/Main");

//Renders the contents according to the route page.
ReactDOM.render(<Main />, document.getElementById("app"));