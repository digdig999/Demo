const db = require('../model/db')
const getHash = require('../model/md').getHash;
const manage = 'manage';//管理员集合名称
const user = 'user';//用户集合名称
const news = 'news';
const device='device'
//req.session.username用户名 req.session.isAdmin 0/1判断是超管还是普通管理员
function errMongo(res) {
    var json = {
        isok: false,
        code: 1,
        info: "数据库错误，请联系后端"
    }
    res.send(json);
}
//默认路径
function defaultRouter(req, res, next) {
    if (req.session.username) {
        next();
    } else {
        var json = {
            isok: false,
            code: -1,
            info: '亲，请先登录'
        }
        res.send(json)
    }
}

//登录
function login(req, res) {
    const body = req.body;//name pass type 0-超管 1-普管 2-user
    switch (body.type) {
        case '0':
            if (body.name == 'admin' && body.pass == '123') {//超管
                var json = {
                    isok: true,
                    code: 0,
                    isAdmin: 0,//用来判断是否是超管，如果是0，是超管，1是普通管理员
                    info: "登录成功"
                }
                req.session.username = body.name;
                req.session.isAdmin = 0;
                res.send(json)
                return;
            } else {
                var json = {
                    isok: false,
                    code: 3,
                    info: "账号或者密码错误"
                }
                res.send(json);
                return;
            } break;
        case '1':
            var query = {
                name: body.name
            }
            db.find(manage, query, (err, result) => {
                if (err) {
                    errMongo(res)
                    return;
                }
                if (result.length == 0) {
                    var json = {
                        isok: false,
                        code: 2,
                        info: "该账号不存在"
                    }
                    res.send(json);
                    return;
                }
                var info = result[0];
                if (getHash(body.pass) == info.pass) {
                    var json = {
                        isok: true,
                        code: 0,
                        isAdmin: 1,
                        info: "登录成功"
                    }
                    req.session.username = body.name;
                    req.session.isAdmin = 0;
                    res.send(json);
                    return;
                } else {
                    var json = {
                        isok: false,
                        code: 3,
                        info: "账号或者密码错误"
                    }
                    res.send(json);
                    return;
                }
            }); break;
        case '2':
            var query = {
                idx: body.name
            }
            db.find(user, query, (err, result) => {
                if (err) {
                    errMongo(res)
                    return;
                }
                if (result.length == 0) {
                    var json = {
                        isok: false,
                        code: 2,
                        info: "该身份证号不存在"
                    }
                    res.send(json);
                    return;
                }
                var info = result[0];
                if (body.pass == info.pass) {
                    var json = {
                        isok: true,
                        code: 0,
                        isAdmin: 2,
                        info: "登录成功"
                    }
                    req.session.username = body.name;
                    req.session.isAdmin = 0;
                    res.send(json);
                    return;
                } else {
                    var json = {
                        isok: false,
                        code: 3,
                        info: "身份证号或者密码错误"
                    }
                    res.send(json);
                    return;
                }
            }); break;
        default:
            var json={
                isok:false,
                code:2,
                info:"缺少必要参数"
            }
            res.send(json)

    }



}
//普通管理员的增删改查
function addManage(req, res) {
    var query = req.query;
    const t1 = {
        name: query.name
    }
    db.find(manage, t1, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        if (result.length == 0) {//可以创建
            if (!query.name || !query.pass || !query.prop || !query.time) {
                var json = {
                    isok: false,
                    info: '缺少必填参数',
                    code: 4,
                }
                res.send(json)
                return;
            }
            t2 = {
                id: new Date().getTime() + '' + Math.floor(Math.random() * (999999 - 10000) + 100000),
                name: query.name,
                pass: getHash(query.pass),
                prop: query.prop,
                time: query.time
            };
            db.insert(manage, t2, (err, result) => {
                if (err) {
                    errMongo(res);
                    return;
                }
                var json = {
                    isok: true,
                    info: '添加成功',
                    code: 0,
                }
                res.send(json)
            })
        } else {//此账号已存在
            var json = {
                isok: false,
                code: 2,
                info: "此账号已存在"
            }
            res.send(json)
        }
    })
}
function delManage(req, res) {
    var query = req.query;
    db.deleteInfo('deleteOne', manage, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
function updateMagage(req, res) {
    var query = req.query;// {id:123}
    var tiao = {
        id: query.id
    }
    var newV = {
        $set: query
    }
    console.log(query)
    db.update('updateOne', manage, tiao, newV, (err, result) => {
        console.log(err)
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })

}
function findManage(req, res) {
    var query = req.query;
    db.find(manage, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 用户管理
function addUser(req, res) {
    var query = req.query;
    const t1 = {
        idx: query.IDNumber
    }
    db.find(user, t1, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        if (result.length == 0) {//可以创建
            if (!query.username || !query.password || !query.radio || !query.phone || !query.email || !query.IDNumber || !query.time) {
                var json = {
                    isok: false,
                    info: '缺少必填参数',
                    code: 4,
                }
                res.send(json)
                return;
            }
            var num=query.time.substring(0,10);
            t2 = {
                id: new Date().getTime() + '' + Math.floor(Math.random() * (999999 - 10000) + 100000),
                name: query.username,
                pass: query.password,
                tel: query.phone,
                email: query.email,
                sex: query.radio==1?"男":"女",
                idx: query.IDNumber,
                time: num
            };
            db.insert(user, t2, (err, result) => {
                if (err) {
                    errMongo(res);
                    return;
                }
                var json = {
                    isok: true,
                    info: '添加成功',
                    code: 0,
                }
                res.send(json)
            })
        } else {//此账号已存在
            var json = {
                isok: false,
                code: 2,
                info: "此身份证号已注册"
            }
            res.send(json)
        }
    })
}
function delUser(req, res) {
    var query = req.query;
    db.deleteInfo('deleteOne', user, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
function updateUser(req, res) {
    var query = req.query;// {id:123}
    var tiao = {
        id: query.id
    }
    var newV = {
        $set: query
    }
    db.update('updateOne', user, tiao, newV, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
}
function findUser(req, res) {
    var query = req.query;
    db.find(user, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 用户
function addNews(req, res) {
    var query = req.query;

    if (!query.tit || !query.con || !query.time) {
        var json = {
            isok: false,
            info: '缺少必填参数',
            code: 4,
        }
        res.send(json)
        return;
    }
    t2 = {
        id: new Date().getTime() + '' + Math.floor(Math.random() * (999999 - 10000) + 100000),
        tit: query.tit,
        con: query.con,
        time: query.time
    };
    db.insert(news, t2, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: '添加成功',
            code: 0,
        }
        res.send(json)
    })
}
function delNews(req, res) {
    var query = req.query;
    db.deleteInfo('deleteOne', news, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
function updateNews(req, res) {
    var query = req.query;// {id:123}
    var tiao = {
        id: query.id
    }
    var newV = {
        $set: query
    }
    db.update('updateOne', news, tiao, newV, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
}
function findNews(req, res) {
    var query = req.query;
    db.find(news, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}

// 图书管理
function addDevice(req, res) {
    var query = req.query;
    // status 1-空闲 0-出售
    if (!query.number || !query.name || !query.writer ||!query.price || !query.classify || !query.time ) {
        var json = {
            isok: false,
            info: '缺少必传参数',
            code: 4,
        }
        res.send(json)
        return;
    }
    var num=query.time.substring(0,10);
    t2 = {
        number: query.number,
        name: query.name,
        writer: query.writer,
        price: query.price,
        classify: query.classify,
        time: num
        // new Date().getTime() + '' + Math.floor(Math.random() * (999999 - 10000) + 100000)
    };
    db.insert(device, t2, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: '添加成功',
            code: 0,
        }
        res.send(json)
    })
}
function delDevice(req, res) {
    var query = req.query;
    db.deleteInfo('deleteOne', device, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: device,
            tag:query
        }
        res.send(json);
    })
}
function updateDevice(req, res) {
    var query = req.query;// {id:123}
    var tiao = {
        id: query.id
    }
    var newV = {
        $set: query
    }
    db.update('updateOne', device, tiao, newV, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
}
function findDevice(req, res) {
    var query = req.query;
    db.find(device, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
//退出登录
function exit(req, res) {
    delete req.session.username;
    var json = {
        isok: true,
        info: "退出成功",
        code: 0
    }
    res.send(json)
}

module.exports = {
    defaultRouter,
    login,
    addManage,
    delManage,
    updateMagage,
    findManage,
    addUser,
    delUser,
    updateUser,
    findUser,
    exit,
    addNews,
    delNews,
    updateNews,
    findNews,
    addDevice,
    delDevice,
    updateDevice,
    findDevice,
}