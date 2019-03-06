import React, { Component } from "react"
import Event from "./event";

export default class EventList extends Component {
    render() {
        const friends = this.props.friends
        .filter(friend => friend.userId === parseInt(sessionStorage.getItem("credentials")))
        .map(frnd => frnd.friendId)
        console.log("friends",friends)
        console.log(this.props.events)
        const evt = this.props.events
            .filter(event => event.userId === parseInt(sessionStorage.getItem("credentials")) ||
            friends.includes(event.userId))

        console.log("evt", evt)
        return (
            <React.Fragment>
                <div>Events</div>
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/events/new")
                        }
                        }>
                        Add New Task
                    </button>
                {this.props.events
                .filter(event => event.userId === parseInt(sessionStorage.getItem("credentials")) ||
                friends.find(friend => friend.friendId === event.userId))
                .map(evt =>
                    <Event key = {evt.id} event = {evt} />)}
            </React.Fragment>
        )
    }
}