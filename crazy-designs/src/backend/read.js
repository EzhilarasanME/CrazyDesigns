var AWS = require("aws-sdk");
let awsConfig = {
  region: "ap-south-1",
  endpoint: "http://dynamodb.ap-south-1.amazonaws.com",
  accessKeyId: "AKIAZTI4DNIVBM2TIO7P",
  secretAccessKey: "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",
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient({region:"ap-south-1"});
let fetchOneByKey = function () {
  var params = {
    TableName: "payment-details",
    Key: {
        PaymentId: "pay_Ldf9wXXmFp8Y71",
    },
  };
  console.log(docClient)
  docClient.get(params, function (err, data) {
    if (err) {
      console.log(
        "users::fetchOneByKey::error - " + JSON.stringify(err, null, 2)
      );
    } else {
      console.log(
        "users::fetchOneByKey::success - " + JSON.stringify(data, null, 2)
      );
    }
  });
};

fetchOneByKey();
