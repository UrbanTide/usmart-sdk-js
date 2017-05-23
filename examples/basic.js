var usmartSDK = require('usmart-sdk');

var usmart = new usmartSDK.USMART();

var organisation 	= '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
var resource 		= 'cd580a25-9918-4bba-a699-fa640a0cc44a';

usmart.request( organisation, resource ).then(function(result){
  console.log(result);
});
