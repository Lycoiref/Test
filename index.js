import { PrismaClient } from "@prisma/client";
import Koa from 'koa';
import cors from '@koa/cors';

const prisma = new PrismaClient();
const app = new Koa();
app.use(cors());

/**
 * model first_itv {
 * id                   Int       @id @default(autoincrement())
 * stu_number           String    @db.VarChar(255)
 * stu_name             String    @db.VarChar(255)
 * qq_number            String    @db.VarChar(255)
 * phone_number         String    @db.VarChar(255)
 * first_itv_department String    @db.VarChar(255)
 * first_itv_time       DateTime? @db.Timestamptz(6)
 * first_itv_time_str   String    @db.VarChar(255)
 * first_itv_result     String    @db.VarChar(255)
 * createdAt            DateTime? @db.Timestamptz(6)
 * updatedAt            DateTime? @db.Timestamptz(6)
 * }
  */

// const main = async () => {
//   const all_students = await prisma.stu_data.findMany();
//   console.log(all_students.length);
//   for(let stu of all_students) {
//     if(stu.stu_number.match(/^2.{7}$/)) {
//       // console.log(stu.stu_number);
//     } else {
//       // 将数组中的元素删除
//       let index = all_students.indexOf(stu);
//       console.log(index, stu.stu_number);
//       all_students.splice(index, 1);
//     }
//   }
//   for(let stu of all_students) {
//     // 将数据存入first_itv表中
//     await prisma.first_itv.create({
//       data: {
//         stu_number: stu.stu_number,
//         stu_name: stu.stu_name,
//         qq_number: stu.stu_qq_number,
//         phone_number: stu.stu_phone_number,
//         first_itv_department: stu.stu_hope_department,
//       }
//     })
//   }
// }

const query = async (name, stu_number) => {
  const stu = await prisma.first_itv.findFirst({
    where: {
      stu_number: stu_number,
      stu_name: name,
    }
  })
  return stu;
}

app.use(async ctx => {
  console.log(ctx.request.query);
  const { name, stu_number, week } = ctx.request.query;
  let stu = await query(name, stu_number);
  let time
  if(week == '3') {
    time = new Date('2023-09-20 20:30:00');
  } else {
    time = new Date('2023-09-21 20:30:00');
  }
  await prisma.first_itv.updateMany({
    where: {
      stu_number: stu_number,
      stu_name: name,
    },
    data: {
      first_itv_time: time,
      first_itv_time_str: week,
    }
  })
  stu = await query('test', 'test');
  console.log(stu);
  ctx.status = 200;
  ctx.body = stu;
})

app.listen(3000, () => {
  console.log('server is running at port 3000');
})
