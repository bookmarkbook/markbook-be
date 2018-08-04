const User = require('../model/user')
const Crypt = require('../common/crypt')
const JWT = require('../common/jwt')

class Auth {

    static async login(ctx) {
        const data = ctx.request.body
        const username = data.username
        const pwd = Crypt.md5(data.pwd)
        const info = await User.get(ctx, username)
        if (info.length === 1) {
            const u = info[0]
            const a = {'usage': 'general', 'timeout': Date.now() + 4 * 60 * 60 * 1000}
            if (u.pwd === pwd) {
                ctx.body = {code: 200, content: JWT.gen(a)}
            } else {
                ctx.body = {code: 403, msg: 'password error'}
            }
        } else {
            ctx.body = {code: 404, msg: 'user not found'}   
        }
    }

}

module.exports = Auth