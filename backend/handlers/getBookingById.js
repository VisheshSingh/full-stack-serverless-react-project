import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  const { id: bookingId } = event.pathParameters;
  const params = {
    TableName: process.env.MY_DYNAMODB_TABLE,
    Key: { id: bookingId },
  };
  try {
    const result = await db.send(new GetCommand(params));
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Could not find booking for booking id - ${bookingId}`,
        }),
      };
    }
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to booking by ${bookingId}`,
        error: err.message,
      }),
    };
  }
};
