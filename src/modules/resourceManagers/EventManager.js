import APIManager from "../utilities/APIManager"

const EventManager = Object.create(APIManager, {
    array: {
        value: "events"
    }
})

export default EventManager