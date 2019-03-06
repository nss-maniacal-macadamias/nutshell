import React, { Component } from "react"
import Event from "./event";

export default class EventList extends Component {
    render() {
        const friends = (this.props.friends
            .filter(friendship => friendship.userId === parseInt(sessionStorage.getItem("credentials"))) || {}).id
        return (
            <React.Fragment>
                <div>Events</div>
                <button>Add New Event</button>
                {this.props.events
                .filter(event => event.userId === parseInt(sessionStorage.getItem("credentials")))
                .map(evt =>
                    <Event event = {evt} />)}
            </React.Fragment>
        )
    }
}