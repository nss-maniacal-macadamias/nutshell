import React, { Component } from "react";

export default class EventForm extends Component {
  // Set initial state
  state = {
    "userId": "",
    "eventName": "",
    "eventLocation": "",
    "eventDate": ""
  };


  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  NewEvent = evt => {
    evt.preventDefault();
    if (this.state.eventName === "") {
      window.alert("Please Enter Event Name");
    }
    else
    {
      const event = {
        eventname: this.state.eventName,
        eventLocation: this.state.eventLocation,
        eventDate: this.state.eventDate,
        userId: parseInt(sessionStorage.getItem("credentials"))
      };
      this.props.addNewEvent(event)
        .then(() => this.props.history.push("/events"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="animalForm">
          <div className="form-group">
            <label htmlFor="eventName">Event name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventName"
              placeholder="Event name"
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
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="eventDate">Assign to caretaker</label>
            <input
              defaultValue=""
              type="date"
              name="eventDate"
              id="eventDate"
              onChange={this.handleFieldChange}
            />
          </div>
          <button
            type="submit"
            onClick={this.NewEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}