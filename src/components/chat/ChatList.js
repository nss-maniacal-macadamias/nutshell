import React, { Component } from 'react'

class ChatList extends Component {
    render() {
        return (
            <section className="ChatRoom">
                <div className="ChatRoomHeader">
                    <h3 key={`candyList`}>Nutshell Chat Room:</h3>
                </div>
                {/* {
                    this.props.messages.map(mObj =>
                        <SingleMessage key={`SingleCandy--${cObj.id}`}
                            TacoCandyTypes={this.props.TacoCandyTypes}
                            candy={cObj}
                            discontinueCandy={this.props.discontinueCandy} />
                    )
                } */}
            </section>
        )
    }
}

export default ChatList
