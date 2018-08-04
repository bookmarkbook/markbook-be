class User {

    static async get(ctx, username) {
        return await ctx.mongo.db('mb').collection('user').find({username: username}).toArray()
    }

}

module.exports = User