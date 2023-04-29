
var AWS = require('aws-sdk');

let awsConfig = {
    "region": "ap-south-1",
    "endpoint": "s3-mini-images-z8y1qqr38gzb4uqrwnaqiyqdje6rnaps3a-s3alias",
    "accessKeyId": "AKIAZTI4DNIVBM2TIO7P", "secretAccessKey": "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"
     
  };

// Set the region 
AWS.config.update(awsConfig);
var params = {
  Bucket: "templates-mini-image-1" 
};

var S3Client = new AWS.S3();


S3Client.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data);
});
