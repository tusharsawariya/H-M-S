import { Router } from 'express';
import { register,  } from '../../controller/medicalStaff.controller';
import { login } from '../../controller/MasterLogin.controller'
const router = Router();

// Register Medical Staff
router.post('/register', register);

// Login Medical Staff
router.post('/login', login); // Fixed the typo from 'pst' to 'post'

export default router;
