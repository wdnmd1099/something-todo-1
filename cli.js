#!/usr/bin/env node
const program = require('commander');
const api = require('./index.js')

program
  .option('-x, --xxx', '起飞咯')


program
  .command('add <任务名>')
  .description('添加任务名')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    api.add(words)
  });
program
  .command('clear')
  .description('删除所有任务')
  .action(() => {
    api.clear()
  });


program.parse(process.argv);

if(process.argv.length === 2){
  //用户没有传参数
  api.showAll()

}