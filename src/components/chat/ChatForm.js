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
            const message = {
                messageText: this.state.messageText,
                messageDateTime: Date().split(" ").splice(0, 5).join(" "),
                userId: parseInt(sessionStorage.getItem("credentials"))
            }
            this.props.addMessage(message)
                .then(() => {
                    // maximum vertical scroll
                    let scrollBottom = document.querySelector(".PostedMessages").scrollHeight - document.querySelector(".PostedMessages").clientHeight
                    // Set vertical scroller to bottom
                    document.querySelector(".PostedMessages").scrollTop = scrollBottom
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className="NewMessageForm">
                    <div className="MessageInput">
                        <textarea
                            required
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