import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskManager from "../modules/resourceManagers/TaskManager"
import EventManager from "../modules/resourceManagers/EventManager"
import ArticleManager from "../modules/resourceManagers/ArticleManager"
import MessageManager from "../modules/resourceManagers/MessageManager"
import FriendShipManager from "../modules/resourceManagers/FriendshipManager"
import ChatList from "./chat/ChatList"
import NewsList from "./news/NewsList";
import UserManager from "../modules/resourceManagers/UserManager";
import NewsEditForm from "./news/NewsEditForm"
class ApplicationViews extends Component {
  state = {
    tasks: [],
    messages: [],
    events: [],
    articles: [],
    friendships: [],
    users: []
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
    })).then(() => UserManager.getAll().then(users => {
      newState.users = users
    })).then(() => {
      this.setState(newState)
    })
  }
  render() {
    return <React.Fragment>
      {/* <Route path="/events" render ={() => {
        <EventList />
      }} /> */}
      <Route path="/chats" render={() => {
        return <ChatList
          messages={this.state.messages}
          users={this.state.users} />
      }} />
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
    </React.Fragment>

  }
}

export default ApplicationViews
