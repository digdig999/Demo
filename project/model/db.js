const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const url = 'mongodb://127.0.0.1:27017';
var dataBase = 'user';
function connect(callback){
    mongoClient.connect(url,(err,client)=>{
        if(err){
            callback(err,null)
            return;
        }
        var user = client.db(dataBase);
        //查询 新建 删除
        callback(null,user)
    })
    
}
function insert(collectionName,query,callback){
    connect(function(err,user){
        if(err){
            callback(err,null);
            return;
        }
        user.collection(collectionName).insert(query,(err,result)=>{
            if(err){
                callback(err,null)
                return;
            }
            callback(null,result)
        })
    })
}
function find(collectionName,query,callback){
    connect((err,user)=>{
        if(err){
            callback(err,null);
            return;
        }
        user.collection(collectionName).find(query).toArray((err,result)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}
function update(updateMethod,collectionName,oldV,newV,callback){
    connect((err,user)=>{
        if(err){
            callback(err,null);
            return;
        }
        user.collection(collectionName)[updateMethod](oldV,newV,(err,result)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}
function deleteInfo(deleteMethod,collectionName,query,callback){
    connect((err,user)=>{
        if(err){
            callback(err,null);
            return;
        }
        user.collection(collectionName)[deleteMethod](query,(err,result)=>{
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
        })
    })
}

module.exports={
    insert,
    find,
    update,
    deleteInfo
}