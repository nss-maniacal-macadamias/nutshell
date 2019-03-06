import React, { Component } from "react"

export default class Event extends Component {
    render() {
        return (
            <div key={this.props.event.id} className="card">
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
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => {
                                this.props.history.push(`/animals/${this.props.animal.id}/edit`);
                            }}
                        > Edit </button>
                        <button className="btn btn-outline-danger"
                            onClick={() => { this.props.DeleteEvent(`${this.props.event.id}`) }}>
                            Delete
                        </button>

                    </div>
                </div>
            </div>
        )
    }
}