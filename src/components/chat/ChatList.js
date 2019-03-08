import React, { Component } from 'react'
import MessageCard from "./MessageCard"
import ChatForm from "./ChatForm"
import "./ChatList.css"
import MessageManager from '../../modules/resourceManagers/MessageManager';

class ChatList extends Component {
    state = {
        userId: 0,
        messageText: "",
        messageDateTime: "",
        id: 0
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange.messageText = evt.target.value;
        this.setState(stateToChange);
    }

    changeClass = (evt) => {
        if (evt.target.textContent === "Edit") {
            document.querySelector(".hidden").className = "visible"
            let id = parseInt(evt.target.id.split("--")[1])
            return MessageManager.GET(id)
                .then((mObj) => {
                    this.setState({
                        messageText: mObj.messageText,
                        userId: parseInt(sessionStorage.getItem("credentials")),
                        messageDateTime: mObj.messageDateTime,
                        id: mObj.id
                    })
                })
        }
    }

    submitEditedMessage = (evt) => {
        if (this.state.messageText === "") {
            window.alert("Please enter a message");
        } else {
            const message = {
                id: this.state.id,
                messageText: this.state.messageText,
                messageDateTime: this.state.messageDateTime,
                userId: this.state.userId
            }
            this.props.editMessage(message)
        }
    }

        render() {
            return (
                <section className="ChatRoom">
                    <div className="ChatRoomHeader">
                        <h3 key={`ChatList`}>Nutshell Chat Room:</h3>
                    </div>
                    <div className="PostedMessages">
                        {
                            this.props.messages.map(mObj =>
                                <MessageCard key={`SingleMessage--${mObj.id}`}
                                    message={mObj}
                                    users={this.props.users}
                                    changeClass={this.changeClass} />
                            )
                        }
                    </div>
                    {
                        <ChatForm key={"ChatForm"}
                            addMessage={this.props.addMessage} />
                    }
                    <div key={"EditForm"} className={"hidden"}>
                        <form className="EditMessageForm">
                            <div className="EditMessageHeader">Update Your Message</div>
                            <div className="MessageInput">
                                <textarea
                                    required
                                    onChange={this.handleFieldChange}
                                    id="EditMessageText"
                                    placeholder="Enter Message Here..."
                                    value={this.state.messageText} />
                            </div>
                            <button
                                type="submit"
                                onClick={this.submitEditedMessage}
                                className="SubmitEditButton" >
                                Update
                        </button>
                        </form>
                    </div>
                </section>
            )
        }
    }

    export default ChatList
