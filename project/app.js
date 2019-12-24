const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');



const app=express();
app.use(express.static('./static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
const  router=require('./controller/router')

console.log("成功运行在localhost:3000")

app.post('/login',router.login);//登录

app.use('/',router.defaultRouter);
//管理员的增删改查
app.get('/addManage',router.addManage);
app.get('/delManage',router.delManage);
app.get('/updateManage',router.updateMagage);
app.get('/findManage',router.findManage);
// 用户的增删改查
app.get('/addUser',router.addUser);
app.get('/delUser',router.delUser);
app.get('/updateUser',router.updateUser);
app.get('/findUser',router.findUser);
//通知
app.get('/addNews',router.addNews);
app.get('/delNews',router.delNews);
app.get('/updateNews',router.updateNews);
app.get('/findNews',router.findNews);
// 设备
app.get('/addDevice',router.addDevice);
app.get('/delDevice',router.delDevice);
app.get('/updateDevice',router.updateDevice);
app.get('/findDevice',router.findDevice);

app.get('/exit',router.exit)


app.listen(3000);
