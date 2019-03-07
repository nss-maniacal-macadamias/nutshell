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
import NewsList from "./news/NewsList";
import NewsEditForm from "./news/NewsEditForm"
class ApplicationViews extends Component {
  state = {
    tasks: [],
    messages: [],
    events: [],
    articles: [],
    friendships: []
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
    .then(()=>TaskManager.GETALL())
      .then(tasks =>{
        console.log(tasks)
        this.setState({
          tasks: tasks
        })
      });
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
          return <TaskEditForm {...props} editTask={this.editTask} tasks={this.state.tasks} />
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
    </React.Fragment>

  }
}

export default ApplicationViews
