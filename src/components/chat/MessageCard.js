import React, { Component } from 'react'

class MessageCard extends Component {
    render() {
        let message = this.props.message
        let user = this.props.users.filter(user => parseInt(user.id) === parseInt(message.userId))
        let username = user[0].username
        let userId = user[0].id
        let headerDate = message.messageDateTime.split(" ").filter((dateEl, idx) => idx <= 2 || (idx === 4))
        headerDate.splice(3,0,"at")
        headerDate.join("!")
        console.log(headerDate)
        return (
            <React.Fragment>
                {
                    (username === parseInt(sessionStorage.getItem("credentials")))
                        ? <div className="YourMessage">
                            <div className="MessageCardHeader"></div>
                        </div>
                        : <div className="OthersMessage">

                        </div>
                }
            </React.Fragment>
        )
    }
}

export default MessageCard