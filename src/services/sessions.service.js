import { UsersDAO } from '../dao/users.dao.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { createHash } from '../utils/hash.js';

// Instanciamos la arquitectura DAO -> Repository
const usersDAO = new UsersDAO();
const usersRepository = new UsersRepository(usersDAO);

export class SessionsService {
  async registerUser({ first_name, last_name, email, password }) {
    // 1. Verificar si el usuario ya existe (el email ya viene normalizado desde el Controller)
    const existingUser = await usersRepository.getUserByEmail(email);
    if (existingUser) {
      const error = new Error('El email ya está registrado');
      error.statusCode = 409;
      throw error;
    }

    // 2. Hashear la contraseña con bcrypt
    const hashedPassword = createHash(password);

    // 3. Crear el usuario (se omite 'role' para que Mongoose use 'user' por defecto)
    const savedUser = await usersRepository.createUser({
      first_name,
      last_name,
      email,
      password: hashedPassword
    });

    // 4. Retornar el usuario SIN la contraseña (la omitimos completamente)
    return {
      id: savedUser._id,
      first_name: savedUser.first_name,
      last_name: savedUser.last_name,
      email: savedUser.email,
      role: savedUser.role
    };
  }
}