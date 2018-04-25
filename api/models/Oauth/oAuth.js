var AuthCode = require('./oauthauthcodes');
var AccessToken = require('./oauthaccesstokens');
var RefreshToken = require('./oauthrefreshtokens');
var User = require('./user');
var Client = require('./oauthclients');

// node-oauth2-server API
module.exports.getAuthCode = AuthCode.getAuthCode;
module.exports.saveAuthCode = AuthCode.saveAuthCode;
module.exports.getAccessToken = AccessToken.getAccessToken;
module.exports.saveAccessToken = AccessToken.saveAccessToken;
module.exports.saveRefreshToken = RefreshToken.saveRefreshToken;
module.exports.getRefreshToken = RefreshToken.getRefreshToken;
module.exports.getUser = User.getUser;
module.exports.getClient = Client.getClient;
module.exports.grantTypeAllowed = Client.grantTypeAllowed;