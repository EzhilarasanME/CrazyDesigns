const {S3} = require('@aws-sdk/client-s3');
const s3 = new S3({region: "ap-south-1",
endpoint: "http://dynamodb.ap-south-1.amazonaws.com",
accessKeyId: "AKIAZTI4DNIVBM2TIO7P",
secretAccessKey: "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"});
var bucketParams = {
    Bucket : "EA-mini-images"
};
function run(){
         s3.createBucket(bucketParams, function(err, data) {
         if (err) {
         console.log("Error", err);
         } else {
         console.log("Success", data.Location);
         }
    })
};
run()