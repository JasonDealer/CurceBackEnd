/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * Сервис авторизации
 */
class AuthorizationService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * Регистрация нового пользователя
   * @param {object} data - объект данных для регистрации
   * @param {string} data.first_name - имя пользователя
   * @param {string} data.password - пароль
   * @param {string} data.middle_name - отчество пользователя
   * @param {string} data.last_name - фамилия пользователя
   * @param {string} data.phone_number - номер телефона
   * @param {string} data.email - адрес электронной почты
   * @returns {Promise<Object>}
   */
  async signUp({ last_name, first_name, middle_name, password, email, phone_number }) {
    if (!last_name || !middle_name || !first_name || !email || !phone_number || !password) throw 'Были переданы пустые поля';
    const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegexp.test(email)) throw 'Неверный формат электронной почты';
    const phoneNumberRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!phoneNumberRegexp.test(phone_number)) throw 'Некорректный формат номер телефона';
    const user = new this.UserModel({
      last_name, first_name, middle_name, password: AuthorizationUtils.encrypt(password), email, phone_number,
    });
    await user.save();
    return { message: 'OK' };
  }

  /**
   * Логин пользователя, выдача токена
   * @param {object} data - объект данных для логина пользователя
   * @param {string} data.email - электронная почта пользователя
   * @param {string} data.password - пароль
   */
  async login({ email, password }) {
    const user = await this.UserModel.findOne({ email });
    if (!user) throw { message: 'Пользователь не найден', statusCode: 404 };
    if (password !== AuthorizationUtils.decrypt(user.password)) throw { message: 'Неверный пароль' };
    const token = jwt.sign({ user_id: user.id, isAdmin: user.isAdmin }, process.env.SECRET_KEY, { expiresIn: '3h' });
    return {
      user_id: user.id,
      token,
    };
  }

  /**
   * Проверка авторизации пользователя
   * @param {object} data - объект данных для проверки авторизации пользователя
   * @param {string} data.token - токен авторизации
   */
  async checkAuthorization({ token }) {
    const userInfo = jwt.verify(token, process.env.SECRET_KEY);
    return { user_id: userInfo.user_id, isAdmin: userInfo.isAdmin };
  }
}

module.exports = AuthorizationService;
