const User = require('../model/user')
const Crypt = require('../common/crypt')

class Auth {

    static async login(ctx) {
        const data = ctx.request.body
        const username = data.username
        const pwd = Crypt.md5(data.pwd)
        const info = await User.get(ctx, username)
        if (info.length === 1) {
            const u = info[0]
            if (u.pwd === pwd) {
                ctx.body = {'code': 200, 'msg': 'login success'}
            } else {
                ctx.body = {'code': 403, 'msg': 'password error'}
            }
        } else {
            ctx.body = {'code': 404, 'msg': 'user not found'}   
        }
    }

}

module.exports = Auth