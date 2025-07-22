const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/auth');

// 👤 Foydalanuvchi profilingi (token bilan kirgan)
router.get('/', authMiddleware, accountController.getAccount);

// 🔄 Ma'lumotlarni yangilash
router.put('/', authMiddleware, accountController.updateAccount);

// 🔐 Parolni yangilash
router.put('/password', authMiddleware, accountController.changePassword);

module.exports = router;
