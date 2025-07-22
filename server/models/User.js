const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }, 
  department: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: 'Department',
      required: true,
    },
    
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4  // 👈 bu yerda 4 ta belgidan kam bo‘lmasligi tekshiriladi
  },
  password: {
    type: String,
    required: true,
    minlength: 4  // 👈 bu yerda 4 ta belgidan kam bo‘lmasligi tekshiriladi
  },
   role: {
      type: String,
      require: true,
      // enum: ['admin', 'user'],
      // default: 'user',
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
