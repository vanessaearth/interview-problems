const Koa=require('koa')
const Router =require('koa-router')
const KoaBody = require('koa-body');
const app=new Koa()

app.use(KoaBody());
const router =new Router()
router.post('/api/accounts/signup',ctx=>{
    console.log(ctx)
    let obj={
      name:'tom',
      age:1
  }
  ctx.body=obj
})
app.use(router.routes())
app.listen(8989)