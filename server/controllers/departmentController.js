const Department = require('../models/Department');

// 🔹 Yangi bo‘lim qo‘shish
exports.createDepartment = async (req, res) => {
  try {
    const { name, responsible } = req.body;
    const newDept = new Department({ name, responsible });
    const saved = await newDept.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Bo‘lim yaratishda xatolik' });
  }
};

// 🔹 Barcha bo‘limlarni olish
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: 'Bo‘limlarni olishda xatolik' });
  }
};

// 🔹 Bo‘limni yangilash
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, responsible } = req.body;
    const updated = await Department.findByIdAndUpdate(
      id,
      { name, responsible },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Bo‘limni yangilashda xatolik' });
  }
};

// 🔹 Bo‘limni o‘chirish
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    await Department.findByIdAndDelete(id);
    res.json({ message: 'Bo‘lim o‘chirildi' });
  } catch (err) {
    res.status(500).json({ error: 'Bo‘limni o‘chirishda xatolik' });
  }
};
