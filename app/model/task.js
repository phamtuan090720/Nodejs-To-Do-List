const fs = require('fs');
const readALlTask = () => {
    const buffer = fs.readFileSync("app/task.json")
    // chuyển sang dạng chuỗi
    const taskString = buffer.toString()

    return JSON.parse(taskString)
}
const getTaskById = (id) => {
    const arrTask = readALlTask()
    const task = arrTask.find((item) => item.id === id)
    return task;
}
const createTask = (title, description) => {
    const newTask = {
        id: Math.random().toString(),
        title: title,
        description: description
    }
    const listTask = readALlTask();
    let newListTask = [...listTask, newTask]
    fs.writeFileSync("app/task.json", JSON.stringify(newListTask))
}
const updateTask = (id, title, description) => {
    const arrTask = readALlTask()
    const index = arrTask.findIndex((task) => task.id === id)
    if (index !== -1) {
        // thực hiện update
        let oldTask = arrTask[index]
        let newTask = { ...oldTask, title: title, description: description }
        arrTask[index] = newTask
        fs.writeFileSync("app/task.json", JSON.stringify(arrTask))
        return newTask
    } else {
        // thông báo cho người dùng biết
        return false
    }
}
const deleteTask = (id) => {
    const arrTask = readALlTask()
    const index = arrTask.findIndex((task) => task.id === id)
    if (index !== -1) {
        const newTaskList = arrTask.filter((item) => item.id !== id)
        fs.writeFileSync("app/task.json", JSON.stringify(newTaskList))
        return true;
    }
    else {
        return false
    }
}
// export bằng ES5
module.exports = {
    readALlTask,
    getTaskById,
    createTask,
    updateTask, deleteTask
}