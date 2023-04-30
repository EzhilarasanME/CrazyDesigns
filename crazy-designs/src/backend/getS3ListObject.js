
var AWS = require('aws-sdk');

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "http://dynamodb.ap-south-1.amazonaws.com",
    "accessKeyId": "AKIAZTI4DNIVBM2TIO7P", "secretAccessKey": "NMrztXOVByBNX7Uw33yVM4BTd8Mpayh+sh/7iIgp"
     
  };

// Set the region 
AWS.config.update(awsConfig);
var params = {
  Bucket: "samplebucket-image" ,
  Key:"Slide2.PNG"
};

var S3Client = new AWS.S3();


S3Client.getObject(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);
});
