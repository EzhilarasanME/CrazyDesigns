import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import AWS                from "aws-sdk"

// Set the AWS Region.
const REGION = "ap-south-1"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ region: REGION });
AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
    });
export { ddbClient };