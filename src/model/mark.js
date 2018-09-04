class Mark {

    static async C(ctx) {
        return await ctx.mongo.db('mb').collection('mark')
    }

    static async get(ctx, user, filter) {
        filter.un = user.un
        return await this.C(ctx).find(filter).toArray()
    }

    static async add(ctx, user, tag) {
        tag.un = user.un
        return await this.C(ctx).insert(tag)
    }

    static async remove(ctx, user, tag) {
        tag.un = user.un
        return await this.C(ctx).remove()
    }

    static async update(ctx, user, tag) {}
}

module.exports = Mark