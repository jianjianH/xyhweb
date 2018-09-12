module.exports =  (router) => {
  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('index', {title: ctx.state});
  });

  router.get('/test', async function (ctx, next) {
    ctx.state = {
      result: 1,
      data: 'this is test data'
    };

    await ctx.render('json', {result: ctx.state.result, data: ctx.state.data});
  })
}
