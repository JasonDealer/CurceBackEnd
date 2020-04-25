/* eslint-disable no-throw-literal */
/* eslint-disable camelcase */
/* eslint-disable-next-line dot-notation */
const AuthorizationService = require('../services/authorization.service');
const UserModel = require('../models/user.model');


/** Класс работы с авторизацией */
class AuthorizationController {
  constructor({ model }) {
    this.authorizationService = new AuthorizationService({ UserModel: model });
    this.checkAuthorization = this.checkAuthorization.bind(this);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  /**
   * Маршрут проверки авторизации пользователя
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async checkAuthorization(req, res) {
    try {
      const [authorizationType, token] = req.headers.authorization.split(' ');
      if (authorizationType !== 'Bearer') throw 'Некорректный тип авторизации';
      const result = await this.authorizationService.checkAuthorization({ token });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * Маршрут регистрации
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async signUp(req, res) {
    try {
      const {
        last_name, first_name, middle_name, password, email, phone_number,
      } = req.body;
      const result = await this.authorizationService.signUp({
        last_name, first_name, middle_name, password, email, phone_number,
      });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }

  /**
   * Маршрут авторизации
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @returns {Promise<void>}
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await this.authorizationService.login({ email, password });
      return res.sendRes(result);
    } catch (err) {
      return res.sendErr(err);
    }
  }
}
module.exports = new AuthorizationController({ model: UserModel });
