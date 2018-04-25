var express = require('express'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    user = require('./api/models/userModel'), //created model loading here
    url = require("url"),
    bodyParser = require('body-parser'),
    oauthserver = require('node-oauth2-server'),
    oAuthModels =  require('./api/models/Oauth/oAuth');

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

//Oauth Implementation
app.oauth = oauthserver({
    model: oAuthModels.oauth,
    grants: ['password', 'authorization_code', 'refresh_token'],
    debug: true
});
app.all('/oauth/token', app.oauth.grant());
app.all('/oauth/authorize', app.oauth.authCodeGrant(function(req, next) {
// The first param should to indicate an error
// The second param should a bool to indicate if the user did authorise the app
// The third param should for the user/uid (only used for passing to saveAuthCode)
    next(null, true, '585273a465f7eb444462eb16', null);
}));
app.get('/', app.oauth.authorise(), function (req, res) {
    res.send('Secret area');
});
app.use(app.oauth.errorHandler());
//END Oauth
var userRoutes = require('./api/routes/userRoutes'); //importing route
userRoutes(app); //register the route

app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);


console.log('iReview RESTful API server started on: ' + port);


module.exports = app;
