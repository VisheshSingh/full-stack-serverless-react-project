export const handler = async (event) => {
  console.log({ event });
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        'Go Serverless v4! Your function executed successfully! - checking multi-stage deployment',
    }),
  };
};
