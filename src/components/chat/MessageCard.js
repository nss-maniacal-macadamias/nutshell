import React, { Component } from 'react'

class MessageCard extends Component {
    render() {
        let message = this.props.message
        let user = this.props.users.filter(user => parseInt(user.id) === parseInt(message.userId))
        let username = user[0].username
        let userId = user[0].id
        let messageDate = message.messageDateTime.split(" ").filter((dateEl, idx) => idx <= 2).join(" ")
        let messageTime = message.messageDateTime.split(" ").filter((dateEl, idx) => idx === 4)
        return (
            <div className="MessageCardHolder">
                {
                    (userId === parseInt(sessionStorage.getItem("credentials")))
                        ? <div className="YourMessage">
                            <div className="MessageCardHeader">
                                <div className="MessageSender">You</div>
                                <div className="MessageSentOn"> posted on {messageDate} at {messageTime}</div>
                            </div>
                            <div className="MessageTextContent">{message.messageText}</div>
                        </div>
                        : <div className="OthersMessage">
                            <div className="MessageCardHeader">
                                <div className="MessageSender">{username}</div>
                                <div className="MessageSentOn"> posted on {messageDate} at {messageTime}</div>
                            </div>
                            <div className="MessageTextContent">{message.messageText}</div>
                        </div>
                }
            </div>
        )
    }
}

export default MessageCard