const bcrypt = require('bcrypt');

const encryptPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(12, (err, salt) => {
            if(err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if(err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
}

const validateEncryption = (password, hash) => {
    return bcrypt.compare(password, hash);
}

module.exports = {
    encryptPassword,
    validateEncryption
}
