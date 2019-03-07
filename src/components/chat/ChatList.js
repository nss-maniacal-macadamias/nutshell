import React, { Component } from 'react'
import MessageCard from "./MessageCard"
import ChatForm from "./ChatForm"
import "./ChatList.css"

class ChatList extends Component {
    render() {
        return (
            <section className="ChatRoom">
                <div className="ChatRoomHeader">
                    <h3 key={`candyList`}>Nutshell Chat Room:</h3>
                </div>
                <div className="PostedMessages">
                    {
                        this.props.messages.map(mObj =>
                            <MessageCard key={`SingleMessage--${mObj.id}`}
                                message={mObj}
                                users={this.props.users} />
                        )
                    }
                </div>
                {
                    <ChatForm key={"ChatForm"} />
                }
            </section>
        )
    }
}

export default ChatList
