const User = require('../model/user')

class Auth {

    static async login(ctx) {
        const data = ctx.request.body
        const username = data.username
        const info = await User.get(ctx, username)
        console.log(info)
        ctx.body = {'info': info}
    }

}

module.exports = Auth