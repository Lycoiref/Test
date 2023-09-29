import { PrismaClient } from "@prisma/client";
import Router from 'koa-router';
import Koa from 'koa';
import cors from '@koa/cors';

const prisma = new PrismaClient();
const app = new Koa();
const router = new Router();
const userRouter = new Router();
app.use(cors());

router.get('/', async (ctx) => {
  console.log('/ called');
  ctx.body = 'hi';
})

router.get('/users/(.*)', async (ctx, next) => {
  console.log('/users called');
  await next();
  ctx.body = 'user'
})

userRouter.get('/new', async (ctx, next) => {
  console.log('/users/new called');
  await next();
  ctx.body = 'user'
})

router.use('/users', userRouter.routes())


app.use(router.routes());

app.listen(1888, () => {
  console.log('server is running at port 3000');
})
