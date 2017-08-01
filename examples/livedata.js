var usmartSDK = require('usmart-sdk');

var usmart = new usmartSDK.USMART({
	keyId: "<<YOUR_KEY_ID>>",
	keySecret: "<<YOUR_KEY_SECRET>>"
});

var organisation 	= '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
var dataset 		= 'da6c9979-4b41-4338-8cfe-012ea16d4bda';

usmart.subscribe(
	organisation,
	dataset
).progress(function(data){
	console.log(data.value);
});

