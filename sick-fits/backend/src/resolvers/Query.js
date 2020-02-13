const { forwardTo } = require('prisma-binding');
const {hasPermission} = require('../utils')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
    if (!ctx.request.userId){
      return null
    }
    return ctx.db.query.user({
      where: {id: ctx.request.userId}
    }, info)
  },
  async users(parent, args, ctx, info){
    if (!ctx.request.userId){
      throw new Error('You must be logged in to continue!')
    }
    hasPermission(ctx.request.user, ['ADMIN','PERMISSIONUPDATE'])
    
    return ctx.db.query.users({},info)
  }
};

module.exports = Query;
