module.exports = (router) => {
  router.get('/test', async function (ctx, next) {
    ctx.state = {
      result: 1,
      data: 'this is test data'
    };

    await ctx.render('json', { jsondata: JSON.stringify(ctx.state) });
  })
}
