import { Router } from 'express';
import { login, logout, me, register } from '../controllers';

const router = Router();

router.route('/')
    .get(me)
    .post(register)

router.route('/login').post(login)

router.route('/logout').get(logout)

export default router;