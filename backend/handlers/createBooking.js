const { v4: uuid } = require('uuid');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  const { title, message } = JSON.parse(event.body);
  const now = new Date().toISOString();

  const booking = {
    id: uuid(),
    title,
    message,
    createdAt: now,
  };

  await db.send(
    new PutCommand({
      TableName: process.env.MY_DYNAMODB_TABLE,
      Item: booking,
    })
  );
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  };
};
