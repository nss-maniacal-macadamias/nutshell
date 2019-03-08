import React, { Component } from "react"

import "./events.css"
export default class Event extends Component {

    render() {
        let addclass = this.props.event.userId === parseInt(sessionStorage.getItem("credentials"))
            ? "card my_card" : "card friends_card "
        addclass = new Date(this.props.event.eventDate) >= new Date() && this.props.index === 0 ? "card first_card": addclass
        console.log(new Date(this.props.event.eventDate))
        return (
            <div key={this.props.event.id} className={addclass} >
                <div className="card-header">
                    <h5 className="card-title">
                        {this.props.event.eventDate}
                    </h5>
                </div>
                <div className="card-body">
                    <div >
                        {this.props.event.eventName}
                    </div>
                    <div>
                        <strong>Location : </strong>{this.props.event.eventLocation}
                    </div>
                </div>
                {(this.props.event.userId === parseInt(sessionStorage.getItem("credentials"))) ?
                    <div className="card-footer">
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
                    </div>
                    : " "}
            </div>
        )
    }
}