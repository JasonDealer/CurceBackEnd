/* eslint-disable class-methods-use-this */
const crypto = require('crypto');

class AuthorizationUtils {
  /**
   * Шифрование пароля с помощью crypt
   * @param {string} password - пароль, который необходимо зашифровать
   */
  encrypt(password) {
    const cipher = crypto.createCipher('aes-128-cbc', process.env.SECRET_KEY);
    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');
    return encryptedPassword;
  }

  /**
   * Дешифрование пароля с помощью crypt
   * @param {string} encryptedPassword - пароль, который необходимо расшифровать
   */
  decrypt(encryptedPassword) {
    const decipher = crypto.createDecipher('aes-128-cbc', process.env.SECRET_KEY);
    let decryptedPassword = decipher.update(encryptedPassword, 'hex', 'utf8');
    decryptedPassword += decipher.final('utf8');
    return decryptedPassword;
  }
}
module.exports = new AuthorizationUtils();
