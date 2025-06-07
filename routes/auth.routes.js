import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { registerValidator, loginValidator, validate } from '../middleware/validation.middleware.js';

const router = express.Router();


router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);


export default router;
