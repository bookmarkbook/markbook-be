const Koa = require('koa')
const mongo = require('koa-mongo')
const parser = require('koa-bodyparser')
const cors = require('@koa/cors')
const app = new Koa()

// --- [middlewares] --- 
app.use(mongo(require('./conf').db))
app.use(parser())
app.use(cors())
// --- * ---

// --- [routers] --- 
const authRouter = require('./router/route-auth')
app.use(authRouter.routes()).use(authRouter.allowedMethods())
// --- * ---

app.listen(3000)