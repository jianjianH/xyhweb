module.exports = (router) => {
  router.get('/test', async function (ctx, next) {
    ctx.state = {
      data: 'this is test data'
    };
  })
}
