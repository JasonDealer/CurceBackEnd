/* eslint-disable no-param-reassign */
/**
 * Добавление дополнительных методов отправки
 * @return {function}
 */
module.exports = (req, res, next) => {
  /**
     * Отвечает заданной ошибкой
     * @param {object} err - Объект содержащий информацию об ошибке {statusCode: 500, message: err}
     */
  res.sendErr = (err) => {
    const statusCode = err.statusCode || 500;
    const message = (typeof err === 'string') ? err : err.message.toString() || 'Произошла ошибка';
    if (typeof err === 'object') {
      delete err.statusCode;
      delete err.message;
    }
    return res.status(statusCode).json({ message, stack: err.stack });
  };
  /**
     * Отправляет ответ на клиент
     * @param {any} data - Данные для отправки
     */
  res.sendRes = (data) => res.send(data);

  return next();
};
