import APIManager from "../utilities/APIManager"

const MessageManager = Object.create(APIManager, {
    array: {
        value: "messages"
    }
})

export default MessageManager