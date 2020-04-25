/* eslint-disable no-return-await */
/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
/* eslint-disable max-len */
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * Сервис работы с пользователями в качестве администратора
 */
class AdminService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * Удаление пользователя
   * @param {object} data - объект данных для удаления пользователя
   * @param {string} data.user_id - идентификатор пользователя
   */
  async deleteUser({ user_id }) {
    await this.UserModel.findByIdAndRemove(user_id);
    return { message: 'OK' };
  }

  /**
   * Получение информации о пользователях или о пользователе
   * @param {object} data - объект данных для получения информации о пользователе или о всех пользователях
   * @param {string} data.user_id - идентификатор пользователя
   */
  async getUsers({ user_id }) {
    if (user_id) return await this.UserModel.findById(user_id).select('-password');
    return await this.UserModel.find({}).select('-password');
  }

  /**
    * Получение информации о пользователе
    * @param {object} data - объект данных для проверки авторизации пользователя
    * @param {string} data.user_id - идентификатор пользователя
    * @param {string} data.first_name - имя пользователя
    * @param {string} data.last_name - фамилия пользователя
    * @param {string} data.middle_name - отчество пользователя
    * @param {string} data.phone_number - номер телефона пользователя
    * @param {string} data.email - электронная почта пользователя
    */
  async editUserInfo({ user_id, first_name, last_name, middle_name, email, phone_number }) {
    if (!last_name || !middle_name || !first_name || !email || !phone_number) throw 'Были переданы пустые поля';
    const emailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!emailRegexp.test(email)) throw 'Неверный формат электронной почты';
    const phoneNumberRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!phoneNumberRegexp.test(phone_number)) throw 'Некорректный формат номер телефона';
    await this.UserModel.findByIdAndUpdate(user_id, {
      first_name, last_name, middle_name, email, phone_number,
    });
    return { message: 'OK' };
  }

  /**
    * Маршрут редактирования пароля пользователя
    * @param {object} data - объект данных для изменения пароля пользоватедя
    * @param {string} data.user_id - идентификатор пользователя
    * @param {string} data.new_password - новый пароль пользователя
    */
  async editUserPassword({ user_id, new_password }) {
    if (!new_password) throw 'Были переданы пустые поля';
    await this.UserModel.findByIdAndUpdate(user_id, {
      password: AuthorizationUtils.encrypt(new_password),
    });
    return { message: 'OK' };
  }
}

module.exports = AdminService;
