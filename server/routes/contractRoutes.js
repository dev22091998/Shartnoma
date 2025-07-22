// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Contract = require('../models/Contract');

// // Fayl yuklash joyi
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage });

// // 🔹 POST: Shartnoma qo‘shish
// router.post('/', upload.single('file'), async (req, res) => {
//   try {
//     const { number, department, company, validUntil, person } = req.body;
//     const file = req.file;

//     const newContract = new Contract({
//       number,
//       department,
//       company,
//       validUntil,
//       person,
//       filePath: file.path,
//       fileName: file.originalname,
//     });

//     await newContract.save();
//     res.status(201).json(newContract);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server xatosi' });
//   }
// });

// // 🔹 GET: Shartnomalar ro‘yxati
// router.get('/', async (req, res) => {
//   try {
//     const contracts = await Contract.find().sort({ createdAt: -1 });
//     res.json(contracts);
//   } catch (err) {
//     res.status(500).json({ message: 'Server xatosi' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { slugify } = require('transliteration');
const {
  getContracts,
  addContract,
  updateContract,
  deleteContract,
  getContractsByDepartment
} = require('../controllers/contractController');

// Fayl saqlash konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// 📄 GET: Barcha shartnomalar
router.get('/', getContracts);

// 📄 POST: Yangi shartnoma fayl bilan
router.post('/', upload.single('file'), addContract);

// ✏️ PUT: Tahrirlash (faylsiz)
router.put('/:id', updateContract);

// 🗑️ DELETE: O‘chirish
router.delete('/:id', deleteContract);

router.get('/department/:id', getContractsByDepartment);

module.exports = router;
