[TOC]



### 前端接口

```
isok:true |false            //true 成功 false失败
code:0                      // 0 成功 -1未登录 1 数据库错误
info:'wer'                  //提示信息
```

#### 1.登录 /login    post请求 

```
参数： name(必填) pass (必填) type (必填)
admin +123 是超管

eg:/login
//0-超管 1-普通管理员 2-yonghu
```

```
// 返回结果
{
    isok: true,
    code: 0, //2-该账号不存在 3-账号或者密码错误
    isAdmin: 1,//0-超管 1-普通管理员 2-yonghu
    info: "登录成功"
}
```



#### 2.添加管理员    /addManage   get请求

```
必填字段：name(账户) pass(密码) prop(属性) time(时间) 
eg:/addManage?name=qq&pass=123321&prop=123&time=20190718
```

返回结果：

```
{
    isok:true|false,
    code:0,                 // 0-成功 2-此账号已存在
    info:"添加成功"
}
```



#### 3.删除管理员  /delManage get请求

```
必填字段：id
eg: /delManage?id=13248324835
```

返回结果：

```
{
    isok:true,
    code:0,
    info:'删除成功'
}
```



#### 4.查询管理员 /findManage get请求

```
选填字段：name(账户) pass(密码) prop(属性) time(时间) id
eg:
/findManage?time=20190417
```

返回结果：

```
{
    isok:true,
    code:0,
    info:"查询成功",
    data:result
}
```



#### 5.更新管理员     /updateMagage get请求

```
必填字段：id
选填字段：prop(属性) time(时间) 
不可修改：name  pass

eg: /updateManage?id=13824&time=20190417
```

返回结果：

```
 {
     isok:true,
     info:"更新成功",
     code:0
 };
```

#### 6.添加用户   /addUser get请求

```
必填字段：name (用户名) pass(密码) tel(电话) email(邮箱) sex(性别) idx(身份证号) des(备注) time(时间)
eg: /addUser?name=qq&pass=123321&tel=15737292929&email=90312@qq.com&sex=男&idx=132222222222222222&des=这是备注&time=20190417 12:00:00
```

返回结果：

```
{
    isok:true,
    info:'添加成功',
    code:0,
}
```

#### 7.删除用户  /delUser get请求

```
必填字段：id
eg: /delUser?id=348738459
```

返回结果：

```
{
    isok:true,
    code:0,
    info:'删除成功'
}
```

#### 8.查询用户  /delUser get请求

```
选填字段：name (用户名) pass(密码) tel(电话) email(邮箱) sex(性别) idx(身份证号) des(备注) time(时间)

eg: /delUser?time=20190419
```

返回结果：

```
{
    isok:true,
    code:0,
    info:"查询成功",
    data:result
}
```

#### 9.更新用户     /updateUser get请求

```
必填字段：id
选填字段：name pass tel email des
不可修改：idx  sex time

eg:
/updateUser?id=12432&tel=34234539
```

返回结果：

```
{
    isok:true,
    info:"更新成功",
    code:0
};
```

#### 10.退出登录  /exit get请求



#### 11.通知    

```
/addNews 
字段：	tit con time
/findNews
/updateNews
/delNews
```

#### 12.设备相关接口

```
/addDevice
字段：ip door num width status(1-空闲 0-已出售) 
/delDevice
/updateDevice
/findDevice

//用户购买
/updateDevice?id=11232&status=0
```

