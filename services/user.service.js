/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable no-throw-literal */
const AuthorizationUtils = require('../utils/authorization.utils');
/**
 * Сервис работы с пользователями
 */
class AuthorizationService {
  constructor({ UserModel }) {
    this.UserModel = UserModel;
  }

  /**
   * Изменение пароля пользователя
   * @param {object} data - объект данных для проверки авторизации пользователя
   * @param {string} data.user_id - идентификатор пользователя
   * @param {string} data.old_password - старый пароль пользователя
   * @param {string} data.new_password - новый пароль пользователя
   */
  async editUserPassword({ old_password, new_password, user_id }) {
    if (!old_password || !new_password) throw 'Были переданы пустые поля';
    const user = await this.UserModel.findById(user_id);
    if (!user) throw { statusCode: 404, message: 'Пользователь не найден' };
    if (AuthorizationUtils.decrypt(user.password) !== old_password) throw 'Старый пароль не совпадает';
    await this.UserModel.findByIdAndUpdate(user_id, {
      password: AuthorizationUtils.encrypt(new_password),
    });
    return { message: 'OK' };
  }

  /**
   * Редактирование информации о пользователе
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
   * Получение информации о пользователе
   * @param {object} data - объект данных для проверки авторизации пользователя
   * @param {string} data.user_id - идентификатор пользователя
   */
  async getUserInfo({ user_id }) {
    const user = await this.UserModel.findById(user_id);
    if (!user) throw { statusCode: 404, message: 'Пользователь не найден' };
    return {
      last_name: user.last_name,
      middle_name: user.middle_name,
      first_name: user.first_name,
      email: user.email,
      phone_number: user.phone_number,
    };
  }
}

module.exports = AuthorizationService;
