const crypto = require('crypto')

const salt = require('../conf').salt

const head = { alg: 'HS256', typ: 'JWT' }

class JWT {

    static gen(payload) {
        const content = `${this.btoa(JSON.stringify(head))}.${this.btoa(JSON.stringify(payload))}`
        const cipher = crypto.createHmac('sha256', salt).update(content).digest('hex')
        return `${content}.${cipher}`
    }

    /**
     * buffer to ascii code
     * [base64 encode]
     *
     * @static
     * @param {*} b Buffer | string
     * @returns
     * @memberof JWT
     */
    static btoa(b) {
        return new Buffer(b).toString('base64')
    }

    /**
     * ascii to buffer
     * [base64 decode]
     *
     * @static
     * @param {*} a
     * @returns
     * @memberof JWT
     */
    static atob(a) {
        return new Buffer(a, 'base64')
    }

}

module.exports = JWT