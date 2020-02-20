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
  },
  async order(parent, args, ctx, info){
    if (!ctx.request.userId) throw new Error('You must be logged in to view orders.')
    const order = await ctx.db.query.order({
      where: {id:args.id}
    },info)
    const ownsOrder = order.user.id === ctx.request.userId
    const permissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN')
    if(!ownsOrder && !permissionToSeeOrder) throw new Error('You don\'t have permission to see this order.')
    return order
  },
  async orders(parent, args, ctx, info){
    const {userId} = ctx.request
    if(!userId) throw new Error('You must be logged in to continue.')
    
    return ctx.db.query.orders({
      where:{user: {id: userId}}},info)
  },
};

module.exports = Query;
