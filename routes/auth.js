import express from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middleware/validators.js';
import { validate } from '../middleware/validate.js';

const router = express.Router();


router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);


export default router;




