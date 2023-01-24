const db = require('./db.js')

module.exports.add = async(words)=>{  //nodejs的导出方式
    //读取之前的任务
       const list = await db.read()
    //添加新的任务
       list.push({words, done:false})
    //存储任务到文件
       await db.write(list)
}

module.exports.clear = async()=>{

}