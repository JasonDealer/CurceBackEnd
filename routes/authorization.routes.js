/**
 * Машруты /api/authorization
 * @namespace AuthorizationRoutes
 */
const express = require('express');
const AuthorizationController = require('../controllers/authorization.controller');

const router = express.Router();
/**
 * @name Регистрация нового пользователя
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/signup
 * @body {string} phone_number - номер телефона
 * @body {string} password - пароль
 * @body {string} middle_name - отчество
 * @body {string} first_name - имя
 * @body {string} last_name - фамилия
 * @body {string} email - электронная почта
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.post('/signup', AuthorizationController.signUp);
/**
 * @name Авторизация пользователя
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/login
 * @body {string} email - электронная почта пользователя
 * @body {string} password - пароль
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.post('/login', AuthorizationController.login);
/**
 * @name Проверка авторизации пользователя
 * @memberof! AuthorizationRoutes
 * @path {POST} /api/authorization/token/check
 * @headers user_id - идентификатор пользователя
 * @headers authorization - авторизационный токен
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.post('/token/check', AuthorizationController.checkAuthorization);

module.exports = router;
