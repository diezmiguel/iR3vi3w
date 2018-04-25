var express = require('express'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    user = require('./api/models/userModel'), //created model loading here
    url = require("url"),
    bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var app = express();

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/iReview', {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Swagger Info
var options = {
    explorer : true
};
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
//END Swagger Info
var userRoutes = require('./api/routes/userRoutes'); //importing route
userRoutes(app); //register the route


app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('iReview RESTful API server started on: ' + port);


module.exports = app;
