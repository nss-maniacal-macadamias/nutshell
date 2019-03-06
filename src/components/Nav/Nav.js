import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
class Nav extends Component {
  logout = () => {
    sessionStorage.clear("credentials")
    this.props.setAuth()
  }

  render() {
    return (
      <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Nutshell
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/tasks">
              Tasks
            </Link>
            </li>
          <li>
            <Link className="nav-link" to="/events">
              Events
            </Link>
            </li>
          <li>
            <Link className="nav-link" to="/chats">
              Chats
            </Link>
            </li>
          <li>
            <Link className="nav-link" to="/articles">
              Articles
            </Link>
          </li>
        </ul>
        <a className="nav-link">Aloha 🌺 {this.props.activeUser.username}</a>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={this.logout}>
          Logout
        </button>
      </nav>
    )
  }
}

export default Nav
