/**
 * Машруты /api/admin
 * @namespace AdminRoutes
 */
const express = require('express');
const authorizationMiddleware = require('../middlewares/authorization.middleware');
const AdminController = require('../controllers/admin.controller');

const router = express.Router();
/**
 * Мидлварь, проверяющая авторизацию
 */
router.use(authorizationMiddleware);
/**
 * Мидлварь, проверяющая, является ли пользователь админом
 */
router.use((req, res, next) => {
  if (req.headers.is_admin) return next();
  return res.sendErr({ statusCode: 403, message: 'Вы не являетесь администратором и не имеет доступа к данному API' });
});
/**
 * @name Получение информации о пользователях или о пользователе
 * @memberof! AdminRoutes
 * @path {GET} /api/admin
 * @headers {string} user_id - идентификатор пользователя (администратора)
 * @query {string} user_id - идентификатор пользователя, информацию о котором необходимо получить
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.get('/', AdminController.getUsers);
/**
 * @name Редактирование информации о пользователе
 * @memberof! AdminRoutes
 * @path {PUT} /api/admin
 * @headers {string} user_id - идентификатор пользователя (администратора)
 * @body {string} user_id - идентификатор пользователя, данные которого будут редактироваться
 * @body {string} phone_number - номер телефона
 * @body {string} middle_name - отчество
 * @body {string} first_name - имя
 * @body {string} last_name - фамилия
 * @body {string} email - электронная почта
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.put('/', AdminController.editUserInfo);
/**
 * @name Редактирование пароля пользователя
 * @memberof! UserRoutes
 * @path {PUT} /api/admin/password
 * @headers {string} user_id - идентификатор пользователя (администратора)
 * @body {string} user_id - идентификатор пользователя, которому необходимо сменить пароль
 * @body {string} new_password - новый пароль
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.put('/password', AdminController.editUserPassword);
/**
 * @name Удаление пользователя
 * @memberof! UserRoutes
 * @path {DELETE} /api/admin
 * @headers {string} user_id - идентификатор пользователя (администратора)
 * @query {string} user_id - идентификатор пользователя, которого необходимо удалить
 * @code {200} Успешно
 * @code {500} Ошибка сервера
 */
router.delete('/', AdminController.deleteUser);

module.exports = router;
