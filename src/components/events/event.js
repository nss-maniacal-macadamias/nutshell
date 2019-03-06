import React, { Component } from "react"

export default class Event extends Component {
    render() {
        return (
            <div>
                {this.props.event.eventName}
                {this.props.event.eventLocation}
                {this.props.event.eventLocation}
            </div>
        )
    }
}