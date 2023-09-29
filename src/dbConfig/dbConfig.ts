import mongoose from 'mongoose';

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (error) => {
      console.log(
        `MongoDB isn't connected. Make sure the connection is established. ${error}`
      );
      process.exit();
    });
  } catch (error) {
    console.error(`Something Went Wrong`);
  }
}

export default connect;

// With each & every API CALL, DATABASE CONNECTION HAS TO BE ESTABLISHED.
// IT's not a once-off situation.
