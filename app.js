const express = require("express")
//Tells app variable to be an express server
const app = express()
const router = express.Router()
//start the web server... app.listen(portnumber,function)
app.listen(3000, function() {
    console.log("Listening on port 3000")
})

//Making an api using routes
//Routes are used to handle browser requests. They look like URL's but the difference is when a browser requests a route, it is dynamically handled using a function

//GET or a regular request when someone goes to http://localhost:3000/hello. when using a function in a route we almost always have a parameter or handle a response & request.
 