import express from 'express';
import { googleAuth, signin, signup, } from '../controllers/auth.js';
const router = express.Router();

// CREATE NEW USER
router.post('/register', signup)

// SIGN IN
router.post('/signin', signin)

// GOOGLE USER
router.post('/google', googleAuth)



export default router;