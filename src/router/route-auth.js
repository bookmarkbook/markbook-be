const Router = require('koa-router')

const AuthRouter = new Router()

const auth = require('../controller/auth')

AuthRouter.post('/login', auth.login)
AuthRouter.post('/refresh', auth.refreshToken)

module.exports = AuthRouter