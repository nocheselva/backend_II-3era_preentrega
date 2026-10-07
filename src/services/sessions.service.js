import User from '../models/User.js'; // <--- Importación por defecto sin {}
import { createHash, isValidPassword } from '../utils/hash.js';

export class SessionsService {
  async registerUser(userData) {
    const { first_name, last_name, email, password } = userData;

    const hashedPassword = createHash(password);

    const newUser = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role: 'user'
    });

    return {
      id: newUser._id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role
    };
  }

  async loginUser(email, password) {
    const user = await User.findOne({ email });

    if (!user) return null;

    const validPassword = isValidPassword(password, user.password);
    if (!validPassword) return null;

    return user;
  }
}