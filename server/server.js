// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const path = require('path');
// const contractRoutes = require('./routes/contractRoutes');

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/contracts', contractRoutes);

// // MongoDB ulanish
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB ulandi'))
//   .catch(err => console.error('MongoDB ulanishda xatolik:', err));

// // Serverni ishga tushurish
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server ${PORT}-portda ishlayapti`));

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db'); // yangi db.js import
const contractRoutes = require('./routes/contractRoutes');
const authRoutes = require('./routes/authRoutes'); // auth uchun
const departmentRoutes = require('./routes/departmentRoutes'); //Bo'lim uchun
const userRoutes = require('./routes/userRoutes'); //Userlarni olish uchun


dotenv.config();
const app = express();

// DB bilan ulanish
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/contracts', contractRoutes);
app.use('/api/auth', authRoutes); // login/register
app.use('/api/departments', departmentRoutes);
app.use('/api/users', userRoutes);


// Serverni ishga tushurish
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server ${PORT}-portda ishlayapti`));
