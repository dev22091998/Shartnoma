const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 🔹 Foydalanuvchi ma'lumotlarini olish
exports.getAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // parolsiz
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Foydalanuvchi topilmadi' });
  }
};

// 🔹 Foydalanuvchi ma'lumotlarini yangilash (ism, username)
exports.updateAccount = async (req, res) => {
  try {
    const { fullName, username } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fullName, username },
      { new: true }
    ).select('-password');

    res.json({ message: 'Ma\'lumotlar yangilandi', user });
  } catch (err) {
    res.status(500).json({ message: 'Yangilashda xatolik yuz berdi' });
  }
};

// 🔹 Parolni yangilash
exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Eski parol noto‘g‘ri' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Parol muvaffaqiyatli yangilandi' });
  } catch (err) {
    res.status(500).json({ message: 'Parolni yangilashda xatolik' });
  }
};
