import React, { Component } from "react";

export default class ChatForm extends Component {
  // Set initial state
  state = {
    userId: 0,
    messageText: "",
    messageDateTime: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  constructNewMessage = evt => {
    evt.preventDefault()
    if (this.state.messageText === "") {
      window.alert("Please enter a new message");
    } else {
      const animal = {
        messageText: this.state.messageText,
        messageDateTime: Date().split(" ").splice(0, 5).join(" "),
        userId: parseInt(sessionStorage.getItem("credentials"))
      }

    //   // Create the animal and redirect user to animal list
    //   this.props
    //     .addAnimal(animal)
    //     .then(() => this.props.history.push("/animals"));
    }
  }

  render() {
    return (
      <React.Fragment>
        <form className="NewMessageForm">
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="messageText"
              placeholder="Enter Message Here..." />
          </div>
          <button
            type="submit"
            onClick={this.constructNewMessage}
            className="SendButton" >
            SEND IT
          </button>
        </form>
      </React.Fragment>
    );
  }
}