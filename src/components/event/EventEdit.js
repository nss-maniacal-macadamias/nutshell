import React, { Component } from "react"
import EventManager from "../../modules/resourceManagers/EventManager";


export default class EventEditForm extends Component {
    // Set initial state
    state = {
        "userId": "",
        "eventName": "",
        "eventLocation": "",
        "eventDate": "",
        "id" :""
      };


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateCurrentEvent = evt => {
        evt.preventDefault()

        if (this.state.eventName === "") {
            window.alert("Please Enter Event Name");
          } else {
            const event = {
                eventName: this.state.eventName,
                eventLocation: this.state.eventLocation,
                eventDate: this.state.eventDate,
                userId: parseInt(sessionStorage.getItem("credentials")),
                id:this.state.id
              };
              this.props.updateEvent(event)
                .then(() => this.props.history.push("/events"));
            }
          };

    componentDidMount() {
        EventManager.GET(this.props.match.params.eventId)
            .then(event => {
                this.setState({
                        eventName :event.eventName,
                        eventLocation: event.eventLocation,
                        eventDate: event.eventDate,
                        userId: parseInt(sessionStorage.getItem("credentials")),
                        id:event.id
                });
            });
    }


    render() {
        return (
            <React.Fragment>
                <form className="eventForm">
                    <div className="form-group">
                        <label htmlFor="eventName">Event name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventName"
                            value={this.state.eventName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventLocation">Location</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            value={this.state.eventLocation}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventDate">Date :</label>
                        <input
                            type="date"
                            name="eventDate"
                            id="eventDate"
                            className="form-control"
                            onChange={this.handleFieldChange}
                            value={this.state.eventDate}
                       />

                    </div>
                    <button
                        type="submit"
                        onClick={this.updateCurrentEvent}
                        className="btn btn-primary" >
                        Submit
                    </button>
                </form>
            </React.Fragment>
        );
    }
}
