const About = () => {
  return (
    <div className='font-display min-h-screen bg-gray-50 p-4'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-4'>About</h1>
        <h2 className='text-xl font-bold'>
          A frontend application built using ⚛️ React by Vishesh Singh 🧑‍💻
        </h2>
        <h4 className='text-orange-600 font-bold'>
          This app leverages APIs built using Serverless framework v4 and uses
          🌐 API Gateway, 🈷️ Lambda functions and 📫 DynamoDB integration
        </h4>
        <p className='mt-4 font-extrabold'>💝 Version 1.0.0 🍵</p>
      </div>
    </div>
  );
};

export default About;
