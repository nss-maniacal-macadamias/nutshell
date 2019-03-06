import React, { Component } from "react"
import { Route } from "react-router-dom"
class ApplicationViews extends Component {
  state = {}
  componentDidMount() {}
  render() {
    return <React.Fragment>
      <Route path="/events" render ={() => {
        // <EventList />
      }} />
    </React.Fragment>
  }
}

export default ApplicationViews
