const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 🔹 GET: Barcha foydalanuvchilarni olish
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // parolni yubormaymiz
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// 🔸 PUT: Foydalanuvchini tahrirlash
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, username, department, role, password } = req.body;

  try {
    const { name, username, password, department, role } = req.body;

    const updateData = { name, username, department, role };

    // 👉 Faqat agar parol bor bo‘lsa, hash qilamiz
    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Foydalanuvchi topilmadi' });
    }

    res.status(200).json({ message: 'Ma’lumotlar yangilandi', user: updatedUser });
  } catch (error) {
    console.error('Yangilash xatosi:', error);
    res.status(500).json({ message: 'Server xatosi' });
  }
};

// 🔸 DELETE: Foydalanuvchini o‘chirish
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'Foydalanuvchi o‘chirildi' });
  } catch (err) {
    res.status(500).json({ message: 'O‘chirishda xatolik' });
  }
};

module.exports = { getUsers, updateUser, deleteUser };
