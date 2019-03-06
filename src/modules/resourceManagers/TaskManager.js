import APIManager from "../utilities/APIManager"

const TaskManager = Object.create(APIManager, {
    array: {
        value: "tasks"
    }
})

export default TaskManager