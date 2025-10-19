import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const { id } = event.pathParameters;
  try {
    await db.send(
      new DeleteCommand({
        TableName: process.env.MY_DYNAMODB_TABLE,
        Key: { id },
      })
    );
    return {
      statusCode: 204,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        message: 'deleted successfully!',
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to delete booking with booking id - ${id}`,
        error: err.message,
      }),
    };
  }
};
