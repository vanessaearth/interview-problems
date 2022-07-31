const Koa = require('koa');
const Router = require('koa-router');
const KoaBody = require('koa-body');

const app = new Koa();
app.use(KoaBody());

const router = new Router();//创建路由。支持传递参数
//response
app.use(async (ctx, next) => {
  ctx.body = 'Hello koa';
  next();
});

router.get("/", async (ctx) => {
  //请求的地址，带参数的路由地址
  console.log(ctx.url)
  //url参数 使用的是 ctx.query
  console.log(ctx.query);
  //console.log(ctx.querystring);
})

//postman
router.post("/api/accounts/signup", async ctx => {
  console.log(ctx.url);//获取请求地址
  console.log(ctx.request.body);//获取参数
  let msg = '', ok = true, status = 200;

  let { username, password } = ctx.request.body
  //假设数据中已存在用户userTom1_
  if (username === 'userTom1_') {
    ok = false
    status = 500
    msg = '用户名已存在'
  } else {
    let reg = /^\w+$/
    let regPwd = /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)[\da-zA-z]$/g
    let numReg = /^[0-9]/


    if (username.length < 5 || username.length > 20) {
      ok = false
      status = 401
      msg = '用户名长度在 5 - 20 之间'
    }
    else if (!reg.test(username)) {
      ok = false
      status = 401
      msg = '用户名必须由小写英文字母，数字，及下划线组成'
    }
    else if (numReg.test(username)) {
      ok = false
      status = 401
      msg = '用户名不能以数字开头'
    }
    else if (password.length < 6) {
      ok = false
      status = 401
      msg = '密码长度须 6 位以上'
    }
    else if (regPwd.test(password)) {
      ok = false
      status = 401
      msg = '密码须包含大写，小写，数字至少二项'
    } else {
      msg = 'success'
    }
  }


  ctx.body = {
    ok,
    status,
    msg
  }
});

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(router.routes()).use(router.allowedMethods());
//localhost:3000
app.listen(8989, () => {
  console.log("http://localhost:3000");
});