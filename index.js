const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (words) => {  //nodejs的导出方式
    //读取之前的任务
    const list = await db.read()
    //添加新的任务
    list.push({ words, done: false })
    //存储任务到文件
    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}

module.exports.showAll = async () => {
    const list = await db.read()

    inquirer.prompt([
        {
            type: 'list',
            name: 'index',
            message: '请选择你想操作的任务',
            choices: [
                { name: '退出', value: '-1' },
                ...list.map((item, index) => {
                    return { name: `${item.done === true ? '[x]' : '[_]'} ${index + 1} ${item.words}`, value: `${index + 1}` }
                }),
                { name: '+ 创建任务', value: '-2' }
            ],
        },
    ])
        .then((answers) => {
            const index = parseInt(answers.index)
            if (index > 0) {
                //说明用户选择了任务
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'action',
                        message: '请选择操作',
                        choices: [
                            { name: '退出', value: 'quit' },
                            { name: '已完成', value: 'markAsDone' },
                            { name: '未完成', value: 'markAsUnDone' },
                            { name: '改标题', value: 'upDateTitle' },
                            { name: '删除任务', value: 'remove' },
                        ],
                    },
                ])
                    .then((answers2) => {
                        switch (answers2.action) {
                            case 'markAsDone':
                                list[index - 1].done = true
                                db.write(list)
                                break;
                            case 'markAsUnDone':
                                list[index - 1].done = false
                                db.write(list)
                                break;
                            case 'upDateTitle':
                                inquirer.prompt({
                                    type: 'input',
                                    name: 'title',
                                    message: '新的标题',
                                    default:list[index-1].words
                                }).then((answers3)=>{
                                    list[index-1].words = answers3.title
                                    db.write(list)
                                })
                                break;
                            case 'remove':
                                list.splice(index,1)
                                db.write(list)
                                break;
                        }
                    })

            } else if (index === -2) {
                //创建任务
                inquirer.prompt({
                    type: 'input',
                    name: 'title',
                    message: '输入新的任务名',
                }).then((answers4)=>{
                    list.push({
                        words: answers4.title,
                        done:false
                    })
                    db.write(list)
                })
            }
        });


}