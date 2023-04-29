var AWS = require("aws-sdk");

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAZTI4DNIVBM2TIO7P", "secretAccessKey": "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"
};

// Set the region 
AWS.config.update(awsConfig);
// Set the region
// AWS.config.loadFromPath(require('./config.json'))

// AWS.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   // credentials not loaded
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

var dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
console.log(dynamodb)