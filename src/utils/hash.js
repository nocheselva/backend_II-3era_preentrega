import bcrypt from 'bcrypt';

// Genera el hash de la contraseña
export const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// Compara contraseñas (útil para la siguiente entrega de login)
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};