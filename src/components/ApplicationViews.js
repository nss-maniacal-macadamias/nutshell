import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskManager from "../modules/resourceManagers/TaskManager"
import EventManager from "../modules/resourceManagers/EventManager"
import ArticleManager from "../modules/resourceManagers/ArticleManager"
import MessageManager from "../modules/resourceManagers/MessageManager"
import FriendShipManager from "../modules/resourceManagers/FriendshipManager"
<<<<<<< HEAD
import EventList from "./events/evenList";
=======
import NewsList from "./news/NewsList";
>>>>>>> master
class ApplicationViews extends Component {
  state = {
    tasks: [],
    messages: [],
    events: [],
    articles: [],
    friendships: []
  }


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
      <Route path="/events" render={(props) => {
        return <EventList events = {this.state.events}
          friends = {this.state.friendships} />
      }} />
      <Route path="/articles" render={(props) => {
                    return <NewsList {...props}
                        // addAnimal={this.addAnimal}
                        articles={this.state.articles} />
                }} />
    </React.Fragment>
  }
}

export default ApplicationViews
