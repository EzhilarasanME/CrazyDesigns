import AWS          from "aws-sdk";
import { DynamoDB } from "@aws-sdk/client-dynamodb";


let awsConfig = {
  region: "ap-south-1",
  endpoint: "http://dynamodb.ap-south-1.amazonaws.com",
  accessKeyId: "AKIAZTI4DNIVBM2TIO7P",
  secretAccessKey: "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",
};

// Set the region
AWS.config.update(awsConfig);
const client = new DynamoDB({ region });
client.listTables({}, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log(data);
});
