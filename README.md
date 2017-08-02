[![Build Status](https://travis-ci.org/UrbanTide/usmart-sdk-js.svg?branch=develop)](https://travis-ci.org/UrbanTide/usmart-sdk-js.svg?branch=develop)
[![Coverage Status](https://coveralls.io/repos/github/UrbanTide/usmart-sdk-js/badge.svg?branch=develop)](https://coveralls.io/github/UrbanTide/usmart-sdk-js?branch=develop)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# USMART SDK JS

## Installing

``` npm install usmart-sdk ```


## Usage

Basic API request
```
var usmartSDK = require('usmart-sdk');

var usmart = new usmartSDK.USMART();

var organisation 	= '28ccd497-7cad-4470-bd17-721d5cbbd6ef';
var resource 		= 'cd580a25-9918-4bba-a699-fa640a0cc44a';

usmart.request( organisation, resource ).then(function(result){
  console.log(result);
});
```

Subscribe to the Live Data Dataset
```
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
```

*Note*: You can find more examples in examples/ and test/ folders
