import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const db = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { firstName, lastName, bookingDate } = JSON.parse(event.body);
    const params = {
      TableName: process.env.MY_DYNAMODB_TABLE,
      Key: { id },
      UpdateExpression:
        'set firstName = :firstName, lastName = :lastName, bookingDate = :bookingDate',
      ExpressionAttributeValues: {
        ':firstName': firstName,
        ':lastName': lastName,
        ':bookingDate': bookingDate,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await db.send(new UpdateCommand(params));
    const updatedBooking = result.Attributes;
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ updatedBooking }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to update', error: err.message }),
    };
  }
};
