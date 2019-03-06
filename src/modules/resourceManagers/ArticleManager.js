import APIManager from "../utilities/APIManager"

const ArticleManager = Object.create(APIManager, {
    array: {
        value: "articles"
    }
})

export default ArticleManager