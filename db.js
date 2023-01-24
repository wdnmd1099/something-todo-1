const homedir = require('os').homedir();    // 系统默认home目录
const home = process.env.Home || homedir;   //如果用户有自定义的home目录就优先使用自定义的home
const fs = require('fs')
const p = require('path')
const dbPath = p.join(home, '.todo')

const db = {

    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, { flag: 'a+' }, (error, data) => {
                if (error) { console.log(error); reject(error) }
                else {
                    let list;
                    try {
                        list = JSON.parse(data.toString()) //解析 JSON 字符串成普通对象
                    } catch (error2) {
                        list = []
                    }
                    resolve(list)
                }
            })
        })
    },


    write(list) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list) //将一个 JavaScript 对象或值转换为 JSON 字符串
            fs.writeFile(dbPath, string + '\n', error3 => {
                if (error3) { console.log(error3); return reject(error3) }
                resolve()
            })

        })
    },
}


module.exports = db