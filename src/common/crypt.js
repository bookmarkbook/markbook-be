const crypto = require('crypto')

class Crypt {

    static md5(i) {
        return crypto.createHash('md5').update(i).digest('hex')
    }
}

module.exports = Crypt