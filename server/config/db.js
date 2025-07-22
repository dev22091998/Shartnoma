const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB ulandi');
  } catch (err) {
    console.error('MongoDB ulanishda xatolik:', err);
    process.exit(1);
  }
};

module.exports = connectDB;

