import React, { Component } from 'react'
import MessageCard from "./MessageCard"
import "./ChatList.css"

class ChatList extends Component {
    render() {
        return (
            <section className="ChatRoom">
                <div className="ChatRoomHeader">
                    <h3 key={`candyList`}>Nutshell Chat Room:</h3>
                </div>
                {
                    this.props.messages.map(mObj =>
                        <MessageCard key={`SingleCandy--${mObj.id}`}
                            message={mObj}
                            users ={this.props.users} />
                    )
                }
            </section>
        )
    }
}

export default ChatList
