import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskManager from "../modules/resourceManagers/TaskManager"
import EventManager from "../modules/resourceManagers/EventManager"
import ArticleManager from "../modules/resourceManagers/ArticleManager"
import MessageManager from "../modules/resourceManagers/MessageManager"
import FriendShipManager from "../modules/resourceManagers/FriendshipManager"
import EventList from "./events/evenList";
import NewsList from "./news/NewsList";
import EventForm from "./events/eventForm";
import NewsEditForm from "./news/NewsEditForm"
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

  addNewEvent = (evtObj) =>
     EventManager.POST(evtObj)
    .then(() => EventManager.GETALL())
    .then(events => this.setState({events : events}))

  render() {
    return <React.Fragment>
      <Route exact path="/events" render={(props) => {
        return <EventList events = {this.state.events}
          friends = {this.state.friendships}
          {...props}/>
        }} />
      <Route exact path="/events/new" render={(props) => {
        return <EventForm events = {this.state.events}
        addNewEvent = {this.addNewEvent}
        friends = {this.state.friendships}
        {...props} />
      }} />
      <Route path="/articles" render={(props) => {
                    return <NewsList {...props}
                        // addAnimal={this.addAnimal}
                        articles={this.state.articles} />
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
