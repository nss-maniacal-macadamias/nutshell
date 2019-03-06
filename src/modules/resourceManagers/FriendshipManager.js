import APIManager from "../utilities/APIManager"

const FriendshipManager = Object.create(APIManager, {
    array: {
        value: "friends"
    }
})

export default FriendshipManager