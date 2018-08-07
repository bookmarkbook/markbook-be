class User {

    static async get(ctx, username) {
        return await ctx.mongo.db('mb').collection('user').find({username: username}).toArray()
    }

    static async add(ctx, un, pwd) {
        return await ctx.mongo.db('mb').collection('user').insert({un: un, pwd: pwd})
    }
}

module.exports = User