const crypto = require('crypto');
function getHash(str){
    var hash=crypto.createHash('md5');
    var result=hash.update(str).digest('hex');
    var str2=result.substr(0,10);
    hash=crypto.createHash('md5');
    var result2=hash.update(str2).digest('hex');
    return result2
}
module.exports={
    getHash
}