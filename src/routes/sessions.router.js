import { Router } from 'express';
import { SessionsController } from '../controllers/sessions.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();
const sessionsController = new SessionsController();

router.post('/register', (req, res) => sessionsController.register(req, res));
router.post('/login', (req, res) => sessionsController.login(req, res));
router.get('/current', authMiddleware, (req, res) => sessionsController.current(req, res));
router.post('/logout', (req, res) => sessionsController.logout(req, res));

export default router;