const Koa = require('koa')
const mongo = require('koa-mongo')
const parser = require('koa-bodyparser')
const app = new Koa()

app.use(mongo({
    host: 'localhost',
    port: 27017,
    user: 'admin',
    pwd: 'lang',
    db: 'mb'
}))

app.use(parser())

const authRouter = require('./router/route-auth')

app.use(authRouter.routes()).use(authRouter.allowedMethods())

app.listen(3000)