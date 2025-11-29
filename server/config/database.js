const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptobridge';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    console.error(`❌ Database Connection Error:`, error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('✅ MongoDB Disconnected');
  } catch (error) {
    console.error('❌ Database Disconnection Error:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, disconnectDB };
