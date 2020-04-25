/* eslint-disable no-throw-literal */
/* eslint-disable camelcase */

const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');


/** Класс работы с пользователями */
class UserController {
  constructor({ model }) {
    this.userService = new UserService({ UserModel: model });
    this.getUserInfo = this.getUserInfo.bind(this);
    this.editUserInfo = this.editUserInfo.bind(this);
    this.editUserPassword = this.editUserPassword.bind(this);
  }

  /**
   * Маршрут изменения пароля пользователе
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async editUserPassword(req, res) {
    try {
      const { user_id } = req.headers;
      const { old_password, new_password } = req.body;
      const result = await this.userService.editUserPassword({ old_password, new_password, user_id });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * Маршрут редактирования информации о пользователе
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async editUserInfo(req, res) {
    try {
      const { user_id } = req.headers;
      const user = req.body;
      const result = await this.userService.editUserInfo({ ...user, user_id });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * Маршрут получения информации о пользователе
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async getUserInfo(req, res) {
    try {
      const { user_id } = req.headers;
      const result = await this.userService.getUserInfo({ user_id });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }
}
module.exports = new UserController({ model: UserModel });
