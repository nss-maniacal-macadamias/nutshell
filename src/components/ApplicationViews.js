import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import TaskManager from "../modules/resourceManagers/TaskManager"
import TaskList from './task/TaskList'
import TaskForm from './task/TaskForm';
import TaskEditForm from './task/TaskEditForm';
import EventManager from "../modules/resourceManagers/EventManager"
import ArticleManager from "../modules/resourceManagers/ArticleManager"
import MessageManager from "../modules/resourceManagers/MessageManager"
import FriendShipManager from "../modules/resourceManagers/FriendshipManager"
import ChatList from "./chat/ChatList"
import NewsList from "./news/NewsList";
import UserManager from "../modules/resourceManagers/UserManager";
import NewsEditForm from "./news/NewsEditForm"
import NewsForm from "./news/NewsForm"
class ApplicationViews extends Component {
  state = {
    tasks: [],
    messages: [],
    events: [],
    articles: [],
    friendships: [],
    users: []
  }
  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)
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
    })).then(() => UserManager.getAll().then(users => {
      newState.users = users
    })).then(() => {
      this.setState(newState)
    })
  }

  addTask = task => {
    return TaskManager.POST(task)
      .then(() => TaskManager.GETALL())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  }

  editTask = task => {
    return TaskManager.PUT(task)
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  }

  deleteTask = id => {
    return TaskManager.DELETE(id)
      .then(() => TaskManager.GETALL())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
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
      <Route exact path="/tasks" render={(props) => {

        return <TaskList
          {...props}
          tasks={this.state.tasks}
          deleteTask={this.deleteTask}
        />

      }} />
      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm
          {...props}
          addTask={this.addTask}
        />
      }} />
      <Route
        path="/tasks/:taskId(\d+)/edit" render={props => {
          return <TaskEditForm {...props} editTask={this.editTask} />
        }}
      />
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
