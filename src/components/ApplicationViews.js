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
import EventList from "./event/EventList";
import NewsList from "./news/NewsList";
import EventForm from "./event/eventForm";
import ChatList from "./chat/ChatList"
import UserManager from "../modules/resourceManagers/UserManager";
import NewsEditForm from "./news/NewsEditForm"
import EventEditForm from "./event/EventEdit";
import NewsForm from "./news/NewsForm"
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
  addArticle = article =>
    ArticleManager.POST(article)
      .then(() => ArticleManager.GETALL())
      .then(articles =>
        this.setState({
          articles: articles
        })
      );

    deleteArticle = (id) => {
      return ArticleManager.DELETE(id)
          .then(() => ArticleManager.GETALL())
          .then(articles => this.setState({ articles: articles }))

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

  addNewEvent = (evtObj) =>
    EventManager.POST(evtObj)
      .then(() => EventManager.GETALL())
      .then(events => this.setState({ events: events }))

  DeleteEvent = (id) =>
    EventManager.DELETE(id)
      .then(() => EventManager.GETALL())
      .then(events => this.setState({ events: events }))

  updateEvent = (eventObj) => {
    console.log(eventObj)
    return EventManager.PUT(eventObj)
            .then(() => EventManager.GETALL())
            .then(events => {
                this.setState({
                    events: events
                })
            });
    };

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

      <Route exact path="/events" render={(props) => {
        return <EventList events={this.state.events}
          friends={this.state.friendships}
          DeleteEvent={this.DeleteEvent}
          updateAnimal={this.updateAnimal}
          {...props} />
      }} />
      <Route exact path="/events/new" render={(props) => {
        return <EventForm events={this.state.events}
          addNewEvent={this.addNewEvent}
          friends={this.state.friendships}
          {...props} />
      }} />
      <Route path="/events/:eventId(\d+)/edit" render={props => {
                    return <EventEditForm {...props}
                    events={this.state.events}
                    updateEvent={this.updateEvent} />
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
          return <TaskEditForm {...props} editTask={this.editTask} tasks={this.state.tasks} />
        }}
      />
      <Route exact path="/articles" render={(props) => {
        return <NewsList {...props}
          friendships = {this.state.friendships}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle} />
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
