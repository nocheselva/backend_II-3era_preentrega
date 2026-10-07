import { SessionsService } from '../services/sessions.service.js';
import { generateToken } from '../utils/jwt.js';

const sessionsService = new SessionsService();

export class SessionsController {
  // 1. REGISTRO (Mantiene tu lógica limpia y validaciones)
  async register(req, res) {
    try {
      const { first_name, last_name, email, password } = req.body;

      if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Faltan campos obligatorios'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

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

  // 2. LOGIN (Genera JWT y setea cookie HttpOnly)
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          status: 'error',
          message: 'Credenciales inválidas'
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Delegamos la validación de credenciales al servicio
      const user = await sessionsService.loginUser(normalizedEmail, password);

      if (!user) {
        // La consigna exige respuesta genérica de error 401
        return res.status(401).json({
          status: 'error',
          message: 'Credenciales inválidas'
        });
      }

      // Generar JWT
      const token = generateToken(user);

      // Guardar JWT en cookie HttpOnly
      const isProduction = process.env.NODE_ENV === 'production';
      res.cookie('currentUser', token, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000, // 1 hora de expiración
        secure: isProduction
      });

      return res.status(200).json({
        status: 'success',
        message: 'Login correcto'
      });

    } catch (error) {
      // Para login, cualquier fallo de autenticación debe responder 401 con mensaje genérico
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas'
      });
    }
  }

  // 3. CURRENT (Ruta protegida que lee req.user desde el middleware)
  async current(req, res) {
    try {
      return res.status(200).json({
        status: 'success',
        payload: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.role
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al obtener usuario actual'
      });
    }
  }

  // 4. LOGOUT (Elimina la cookie de sesión)
  async logout(req, res) {
    try {
      res.clearCookie('currentUser');
      return res.status(200).json({
        status: 'success',
        message: 'Sesión cerrada'
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Error al cerrar sesión'
      });
    }
  }
}