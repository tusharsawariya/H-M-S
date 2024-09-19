import { Router } from 'express';
import { register } from '../../controller/patient.controller';
import { login } from '../../controller/MasterLogin.controller';
const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
