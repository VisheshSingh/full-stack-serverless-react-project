import { v4 as uuid } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const { firstName, lastName, date } = JSON.parse(event.body);
  const now = new Date().toISOString();
  const booking = {
    id: uuid(),
    firstName,
    lastName,
    date,
    createdAt: now,
  };

  try {
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
      body: JSON.stringify(booking),
    };
  } catch (error) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create booking',
        error: err.message,
      }),
    };
  }
};
