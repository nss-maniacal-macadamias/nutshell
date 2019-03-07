import React, { Component } from "react"
import Event from "./event";

import "./events.css"
export default class EventList extends Component {
    render() {
        const friends = this.props.friends
            .filter(friend => friend.userId === parseInt(sessionStorage.getItem("credentials")))
            .map(frnd => frnd.friendId)
        const evt = this.props.events
            .filter(event => (event.userId === parseInt(sessionStorage.getItem("credentials")) ||
                friends.includes(event.userId)) && new Date(event.eventDate) >= new Date())
        console.log("evt", evt)
        return (
            <React.Fragment>
                <div className="center_class">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/events/new")
                        }
                        }>
                        Add New Event
                    </button>
                </div>
                <div className= "txt">Up comming events </div>
                <div className="flex_container">
                    {this.props.events
                        .filter(event => (event.userId === parseInt(sessionStorage.getItem("credentials")) ||
                            friends.includes(event.userId)) && new Date(event.eventDate) >= new Date())
                        .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
                        .map((evt, index) =>
                            <Event key={evt.id} event={evt}
                                DeleteEvent={this.props.DeleteEvent}
                                {...this.props}
                                index={index} />
                        )}
                </div><hr/>
                <div className="txt"> Past Events</div>
                <div className="flex_container">
                    {this.props.events
                        .filter(event => (event.userId === parseInt(sessionStorage.getItem("credentials")) ||
                            friends.includes(event.userId)) && new Date(event.eventDate) < new Date())
                        .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
                        .map((evt, index) =>
                            <Event key={evt.id} event={evt}
                                DeleteEvent={this.props.DeleteEvent}
                                {...this.props}
                                index={index} />
                        )}
                </div>
            </React.Fragment>
        )
    }
}