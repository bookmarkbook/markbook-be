const User = require('../model/user')
const Crypt = require('../common/crypt')
const JWT = require('../common/jwt')
const {token_alive} = require('../common/const')

class Auth {

    static async login(ctx) {
        const data = ctx.request.body
        const username = data.username
        const pwd = Crypt.md5(data.pwd)
        const info = await User.get(ctx, username)
        if (info.length === 1) {
            const u = info[0]
            const a = {usage: 'general', expiration: Date.now() + token_alive}
            if (u.pwd === pwd) {
                ctx.body = {code: 200, content: JWT.gen(a)}
            } else {
                ctx.body = {code: 403, msg: 'password error'}
            }
        } else {
            ctx.body = {code: 404, msg: 'user not found'}   
        }
    }

    static async refreshToken(ctx) {
        const data = ctx.request.body
        const payload = JWT.validate(data.token)
        if (payload) {
            const now = Date.now()
            if (payload.expiration > now) {
                payload.expiration = now + token_alive
                ctx.body = {code: 200, msg: JWT.gen(payload)}
            } else {
                ctx.body = {code: 400, msg: 'token expired'}
            }
        } else {
            ctx.body = {code: 401, msg: 'token invalid'}
        }
    }

}

module.exports = Auth