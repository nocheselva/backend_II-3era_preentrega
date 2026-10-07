import { SessionsService } from '../services/sessions.service.js';

const sessionsService = new SessionsService();

export class SessionsController {
  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      // 1. Validar presencia de campos obligatorios
      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Faltan campos obligatorios'
        });
      }

      // 2. Normalizar email (trim + lowercase) antes de validar y guardar
      const normalizedEmail = email.trim().toLowerCase();

      // 3. Validar formato de email y longitud mínima de contraseña
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({
          status: 'error',
          message: 'El formato del email es inválido'
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          status: 'error',
          message: 'La contraseña debe tener al menos 6 caracteres'
        });
      }

      // 4. Ejecutar registro pasando los datos con el email normalizado
      const result = await sessionsService.registerUser({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: normalizedEmail,
        password
      });

      return res.status(201).json({
        status: 'success',
        payload: result
      });

    } catch (error) {
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({
        status: 'error',
        message: error.message || 'Error interno del servidor'
      });
    }
  }
}