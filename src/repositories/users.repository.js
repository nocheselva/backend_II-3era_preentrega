export class UsersRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getUserByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async createUser(userData) {
    return await this.dao.create(userData);
  }
}