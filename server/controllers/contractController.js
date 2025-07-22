const Contract = require('../models/Contract');
const fs = require('fs');
const path = require('path');

// 🔹 GET: Barcha shartnomalar
const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
};

// 🔹 POST: Yangi shartnoma qo‘shish (multer fayl bilan ishlaydi)
const addContract = async (req, res) => {
  try {
    const { number, department, company, validUntil, person } = req.body;
    const file = req.file;

    const newContract = new Contract({
      number,
      department,
      company,
      validUntil,
      person,
      filePath: file.path,
      fileName: file.originalname,
    });

    await newContract.save();
    res.status(201).json(newContract);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server xatosi', error: err.message });
  }
};

// 🔹 PUT: Shartnomani yangilash (faqat ma'lumot)
// const updateContract = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { number, department, company, validUntil, person } = req.body;

//     const updated = await Contract.findByIdAndUpdate(
//       id,
//       { number, department, company, validUntil, person },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: 'Shartnoma topilmadi' });
//     }

//     res.json(updated);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Tahrirlashda server xatosi', error: err.message });
//   }
// };
const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, department, company, validUntil, person } = req.body;
    console.log(req.body)

    const updated = await Contract.findByIdAndUpdate(
      id,
      { number, department, company, validUntil, person },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Shartnoma topilmadi' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err); // 🔴 Bunda qanday xato chiqayotganini terminalda ko‘ring
    res.status(500).json({ message: 'Tahrirlashda server xatosi', error: err.message });
  }

};


// 🔹 DELETE: Shartnomani o‘chirish
const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;

    // Avval shartnoma topiladi
    const contract = await Contract.findById(id);
    if (!contract) {
      return res.status(404).json({ message: 'Shartnoma topilmadi' });
    }

    // Fayl manzili (server papkasi ichida to‘liq yo‘l)
    const filePath = path.join(__dirname, '..', contract.filePath);

    // Faylni tizimdan o‘chirishga harakat qilamiz
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Faylni o‘chirishda xatolik:', err.message);
        // Fayl topilmasa ham davom etamiz
      } else {
        console.log('Fayl muvaffaqiyatli o‘chirildi:', contract.filePath);
      }
    });

    // So‘ngra MongoDB'dan shartnomani o‘chiramiz
    await Contract.findByIdAndDelete(id);

    res.json({ message: 'Shartnoma va fayl o‘chirildi' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'O‘chirishda server xatosi', error: err.message });
  }
  // try {
  //   const { id } = req.params;
  //   const deleted = await Contract.findByIdAndDelete(id);

  //   if (!deleted) {
  //     return res.status(404).json({ message: 'Shartnoma topilmadi' });
  //   }

  //   res.json({ message: 'Shartnoma o‘chirildi' });
  // } catch (err) {
  //   console.error(err);
  //   res.status(500).json({ message: 'O‘chirishda server xatosi', error: err.message });
  // }
};

const getContractsByDepartment = async (req, res) => {
  try {
    const contracts = await Contract.find({ department: req.params.id });
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: 'Shartnomalarni olishda xatolik' });
  }
};

module.exports = {
  getContracts,
  addContract,
  updateContract,
  deleteContract,
  getContractsByDepartment
};
