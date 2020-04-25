/**
 * Машруты /api/user
 * @namespace UserRoutes
 */
const express = require('express');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();
/**
 * Мидлварь, проверяющая авторизацию
 */
router.use(authorizationMiddleware);
/**
 * @name Получение информации о пользователе
 * @memberof! UserRoutes
 * @path {GET} /api/user
 * @headers {string} user_id - идентификатор пользователя
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.get('/', UserController.getUserInfo);
/**
 * @name Редактирование информации о пользователе
 * @memberof! UserRoutes
 * @path {PUT} /api/user
 * @headers {string} user_id - идентификатор пользователя
 * @body {string} phone_number - номер телефона
 * @body {string} middle_name - отчество
 * @body {string} first_name - имя
 * @body {string} last_name - фамилия
 * @body {string} email - электронная почта
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.put('/', UserController.editUserInfo);
/**
 * @name Редактирование пароля пользователя
 * @memberof! UserRoutes
 * @path {PUT} /api/user/password
 * @headers {string} user_id - идентификатор пользователя
 * @body {string} old_password - старый пароль
 * @body {string} new_password - новый пароль
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.put('/password', UserController.editUserPassword);

module.exports = router;
