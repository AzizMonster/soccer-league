import prisma from "@configs/prisma-client";
import { Role } from '@prisma/client';
import { APIError } from "@helpers/api-error.helper";
import Errors from "@constants/errors.constant";
import HttpStatusCodes from "@constants/Http-status-codes.constants";
import bcrypt from "bcrypt";

class UserService {
  /**
   * Hashes a user's password.
   * @param {string} password - Plain text password
   * @returns {Promise<string>} - Hashed password
   */
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Creates a new user.
   * @param {Object} data - Data to create a user
   * @param {string} data.name - User's name
   * @param {string} data.email - User's email
   * @param {string} data.password - User's plain text password
   * @param {string} [data.role] - User's role
   * @returns {Promise<Object>} - The created user
   * @throws {APIError} - If the email already exists
   */
  async createUser(data: { name: string; email: string; password: string; role?: Role }) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) {
      throw new APIError(Errors.USER.DUPLICATE_EMAIL, HttpStatusCodes.CONFLICT);
    }

    const hashedPassword = await this.hashPassword(data.password);
    return prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  /**
   * Retrieves all users.
   * @returns {Promise<Object[]>} - List of users
   */
  async getUsers() {
    return prisma.user.findMany();
  }

  /**
   * Retrieves a user by ID.
   * @param {string} id - User ID
   * @returns {Promise<Object>} - The user
   * @throws {APIError} - If the user is not found
   */
  async getUserById(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new APIError(Errors.USER.NOT_FOUND, HttpStatusCodes.NOT_FOUND);
    }
    return user;
  }

  /**
   * Updates a user by ID.
   * @param {string} id - User ID
   * @param {Object} data - Fields to update
   * @returns {Promise<Object>} - Updated user
   * @throws {APIError} - If the user does not exist
   */
  async updateUser(id: string, data: Partial<{ name: string; email: string; role: Role }>) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new APIError(Errors.USER.NOT_FOUND, HttpStatusCodes.NOT_FOUND);
    }

    return prisma.user.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a user by ID.
   * @param {string} id - User ID
   * @returns {Promise<Object>} - Success message
   * @throws {APIError} - If the user does not exist
   */
  async deleteUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new APIError(Errors.USER.NOT_FOUND, HttpStatusCodes.NOT_FOUND);
    }

    await prisma.user.delete({ where: { id } });
    return { message: "User deleted successfully" };
  }
}

export default UserService;
