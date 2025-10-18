exports.handler = async (event) => {
  const { title, message } = JSON.parse(event.body);
  return {
    statusCode: 201,
    body: JSON.stringify({
      title,
      message,
    }),
  };
};
