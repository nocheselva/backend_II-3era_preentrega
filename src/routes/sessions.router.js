import { Router } from 'express';
import { SessionsController } from '../controllers/sessions.controller.js';

const router = Router();
const sessionsController = new SessionsController();

router.post('/register', (req, res) => sessionsController.register(req, res));

export default router;