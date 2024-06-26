const mongoose = require('mongoose');

// to connect
async function connectMDB() {
  const { MONGO_URI_FACE_PROD, MONGO_URI_FACE_DEV, MONGO_URI_TEST, NODE_ENV } =
    process.env;

  let mongoUri;

  if (NODE_ENV === 'production') {
    mongoUri = MONGO_URI_FACE_PROD;
  } else if (NODE_ENV === 'test') {
    mongoUri = MONGO_URI_TEST;
  } else {
    mongoUri = MONGO_URI_FACE_DEV;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });

    const { name, host, port } = conn.connection;

    if (NODE_ENV !== 'test') {
      console.log(
        `MongoDB Connected: ${host}:${port}/${name} pid:${process.pid}`
      );
    }
  } catch (error) {
    console.error('Error-at-Connection:');
    console.error(error);
    process.exit(0); // exit 0-to clean exit, 1-indicate of error
  }
}

// to disconnect
async function mongoDisconnect() {
  // await mongoose.connection.close()
  await mongoose.disconnect();
}

module.exports = { connectMDB, mongoDisconnect };
