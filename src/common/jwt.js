const crypto = require('crypto')

const salt = require('../conf').salt

const head = { alg: 'HS256', typ: 'JWT' }

/**
 * buffer to ascii code
 * [base64 encode]
 *
 * @static
 * @param {*} b Buffer | string
 * @returns
 * @memberof JWT
 */
function btoa(b) {
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
function atob(a) {
    return new Buffer(a, 'base64')
}

class JWT {

    /**
     * generate jwt token
     *
     * @static
     * @param {*} payload
     * @returns
     * @memberof JWT
     */
    static gen(payload) {
        const content = `${btoa(JSON.stringify(head))}.${btoa(JSON.stringify(payload))}`
        const cipher = crypto.createHmac('sha256', salt).update(content).digest('hex')
        return `${content}.${cipher}`
    }

    /**
     * validate jwt token
     *
     * @memberof JWT
     */
    static validate(token) {
        const blocks = token.split('.')
        if (3 !== blocks.length) return false

        const h = JSON.parse(atob(blocks[0]).toString())
        if (h.typ && h.typ === head.typ && h.alg && h.alg === head.alg) {

            const payload = JSON.parse(atob(blocks[1]).toString())
            const jwt = this.gen(payload)
            if (jwt === token) {
                return payload
            }
        }

        return false
    }
}

module.exports = JWT