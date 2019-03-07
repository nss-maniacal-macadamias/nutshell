import React, { Component } from "react"

import "./events.css"
export default class Event extends Component {

    render() {
        const addclass = this.props.event.userId === parseInt(sessionStorage.getItem("credentials"))
            ? "card" : "card color_background"
        return (
            <div key={this.props.event.id} className={addclass} >
                <div className="card-body">
                    <h5 className="card-title">
                        <div>{this.props.event.eventName}</div>
                    </h5>
                    <div >
                        {this.props.event.eventLocation}
                    </div>
                    <div>
                        {this.props.event.eventDate}
                    </div>
                    {(this.props.event.userId === parseInt(sessionStorage.getItem("credentials"))) ?
                        <div className="btn-container">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/events/${this.props.event.id}/edit`);
                                }}
                            > Edit </button>
                            <button className="btn btn-outline-danger"
                                onClick={() => { this.props.DeleteEvent(`${this.props.event.id}`) }}>
                                Delete
                        </button>
                        </div>
                        : " "}
                </div>
            </div>
        )
    }
}