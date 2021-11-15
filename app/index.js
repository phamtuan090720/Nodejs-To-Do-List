// import yargs from 'yargs'; (es6)
// sử dụng commonjs để import es5
const yargs = require("yargs");
// file sytem (build in nodejs)
const fs = require('fs');
// đổi màu chữ hiển thị trên cmd
const chalk = require('chalk');

const { readALlTask, getTaskById, createTask, updateTask, deleteTask } = require("./model/task.js")
// tạo lệnh để test
yargs.command({
    command: "test",
    handler: () => {
        console.log("test")
    },
})

// CRDU

// create : node app/index.js create --title="Hoc Node Js" --description="Dễ ẹc"

yargs.command({
    command: "create",
    builder: {
        title: {
            type: "string"
        },
        description: {
            type: "string"
        },

    },
    handler: (arg) => {
        const { title, description } = arg;
        createTask(title, description)
        console.log("Đã tạo mới công việc thành công")
    },
})
// read-all : node app/index.js read-all
yargs.command({
    command: "read-all",
    handler: () => {
        const allTask = readALlTask()
        console.log(chalk.blue("list task"), allTask)
    },
})
// read-detail : node app/index.js read-detail --id="1"
yargs.command({
    command: "read-detail",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (arg) => {
        const { id } = arg
        const task = getTaskById(id);
        if (task) {
            console.log("task", task)
        }
        else {
            console.log(chalk.red("Không có task có id là " + id))
        }
    },
})
// delete : node app/index.js delete read-detail --id="123"
yargs.command({
    command: "delete",
    builder: {
        id: {
            type: "string"
        }
    },
    handler: (arg) => {
        const { id } = arg
        if (deleteTask(id)) {
            console.log("delete thành công")
        }
        else {
            console.log(chalk.red("delete thất bại"))
        }

    },
})
// update : node app/index.js update --id="123" --title="Học Nodejs" --description="dễ ẹc"
yargs.command({
    command: "update",
    builder: {
        id: {
            type: "string"
        },
        title: {
            type: "string"
        },
        description: {
            type: "string"
        },
    },
    handler: (arg) => {
        const { id, title, description } = arg
        console.log(id, title, description)
        let task = updateTask(id, title, description)
        if (task) {
            console.log("update thành công")
            console.log("new task", task)
        }
        else {
            console.log(chalk.red("update thất bại"))
        }
    },
})

// lưu lại các lệnh vừa tạo
yargs.parse()
