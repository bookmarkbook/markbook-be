const Koa = require('koa')
const mongo = require('koa-mongo')
const parser = require('koa-bodyparser')
const app = new Koa()

// --- [middlewares] --- 
app.use(mongo(require('./conf').db))
app.use(parser())
app.use(async (ctx, next) => {
    await next();
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
})
// --- * ---

// --- [routers] --- 
const authRouter = require('./router/route-auth')
app.use(authRouter.routes()).use(authRouter.allowedMethods())
// --- * ---

app.listen(3000)