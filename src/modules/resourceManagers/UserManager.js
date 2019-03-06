import APIManager from "../utilities/APIManager"

const UserManager = Object.create(APIManager, {
    array: {
        value: "users"
    }
})

export default UserManager