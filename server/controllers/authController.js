const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, department, username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'Username mavjud' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, department, username, password: hashedPassword, role });

    res.status(201).json({ message: 'Foydalanuvchi yaratildi' });
  } catch (error) {
    res.status(500).json({ message: error.message, error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Login xato' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Parol noto‘g‘ri' });

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role, username: user.username, department: user.department,  }, process.env.JWT_SECRET, {
      expiresIn: '180m'
    });

    res.json({ token, user : {
          id: user._id,
          name: user.name,
          username: user.username,     // 👈 BUNI QO‘SHING
          role: user.role,
          department: user.department,
    } });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

module.exports = { register, login };
