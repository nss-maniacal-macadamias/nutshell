import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskManager from "../modules/resourceManagers/TaskManager"
import EventManager from "../modules/resourceManagers/EventManager"
import ArticleManager from "../modules/resourceManagers/ArticleManager"
import MessageManager from "../modules/resourceManagers/MessageManager"
import FriendShipManager from "../modules/resourceManagers/FriendshipManager"
import NewsList from "./news/NewsList";
import NewsEditForm from "./news/NewsEditForm"
import NewsForm from "./news/NewsForm"
class ApplicationViews extends Component {
  state = {
    tasks: [],
    messages: [],
    events: [],
    articles: [],
    friendships: []
  }
  updateArticle = (editedArticleObject) => {
    return ArticleManager.PUT(editedArticleObject)
      .then(() => ArticleManager.GETALL())
      .then(articles => {
        this.setState({
          articles: articles
        })
      });
  };
  addArticle = article =>
    ArticleManager.POST(article)
      .then(() => ArticleManager.GETALL())
      .then(articles =>
        this.setState({
          articles: articles
        })
      );


  componentDidMount() {
    const newState = {}

    TaskManager.GETALL().then(tasks => {
      newState.tasks = tasks
    }).then(() => EventManager.GETALL().then(events => {
      newState.events = events
    })).then(() => ArticleManager.GETALL().then(articles => {
      newState.articles = articles
    })).then(() => MessageManager.GETALL().then(messages => {
      newState.messages = messages
    })).then(() => FriendShipManager.GETALL().then(friendships => {
      newState.friendships = friendships
    })).then(() => {
      this.setState(newState)
    })
  }
  render() {
    return <React.Fragment>
      <Route exact path="/articles" render={(props) => {
        return <NewsList {...props}
          // addAnimal={this.addAnimal}
          articles={this.state.articles} />
      }} />
      <Route
        exact path="/articles/:articleId(\d+)/edit" render={props => {
          return <NewsEditForm {...props}
            articles={this.state.articles}
            updateArticle={this.updateArticle} />
        }}
      />
      <Route path="/articles/new" render={(props) => {
        return <NewsForm {...props}
          addArticle={this.addArticle}
          />
      }} />

    </React.Fragment>

  }
}

export default ApplicationViews
