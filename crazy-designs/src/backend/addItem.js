
// Load the AWS SDK for JS
var AWS = require("aws-sdk");

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAZTI4DNIVBM2TIO7P", "secretAccessKey": "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"
};

// Set the region 
AWS.config.update(awsConfig);

// -----------------------------------------
// Create the document client interface for DynamoDB
var documentClient = new AWS.DynamoDB.DocumentClient();
console.log(documentClient)
  var params = {
    TableName: "payment-details",
    Item: {
      "PaymentId":  "pay_Ldf9wXXmFp8Y72",
      "Email":"ezh@gamil"
    }
  };

  documentClient.put(params, function(err, data) {
    if (err) {
      console.error("Can't add song. Darn. Well I guess Fernando needs to write better scripts.");
    } else {
      console.log("Succeeded adding an item for this song: ");
    }
  });