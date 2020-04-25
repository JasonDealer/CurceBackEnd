const jwt = require('jsonwebtoken');
/**
 * Проверка валидности токена
 */
module.exports = (req, res, next) => {
  try {
    const usersToken = req.headers.authorization.split(' ')[1];
    const tokenPayload = jwt.verify(usersToken, process.env.SECRET_KEY);
    req.headers.user_id = tokenPayload.user_id;
    req.headers.is_admin = tokenPayload.isAdmin;
    return next();
  } catch (err) {
    return res.sendErr(err);
  }
};
