import React, { Component } from 'react'
// import { Link } from "react-router-dom";
// import "./Task.css"




class FriendsList extends Component {

    render() {
        const friendsIds = this.props.friendships.filter(friendship => friendship.userId === Number(sessionStorage.getItem("credentials")))
            .map(friendship => friendship.friend)
        const friendShips = this.props.friendships.filter(friendship => friendship.userId === Number(sessionStorage.getItem("credentials")))
        
        let friends = this.props.users.filter(user =>
            friendsIds.includes(user.id))

        


        // console.log(this.props.users.filter(user => user.id === friendsIds[1]))
        // this.props.users.filter(users => users.id === friendsIds).map(users.userName)

        return (
            <React.Fragment>
                <section className="friends container" >
                    <h1>Your Friends List</h1>
                    <button type="button"
                        onClick={() => this.props.history.push("/friends/new")}
                        className="btn btn-success">
                        Find Friend
                    </button>
                    
                    {friends.map(friend =>

                        <div key={friend.id} className="friend container">
                            {friend.username} <br />
                            <a href="#"
                                onClick={() => {
                                    let id = friendShips.find(ship => ship.friend === friend.id && ship.userId === Number(sessionStorage.getItem("credentials")) )
                                    console.log( id.id)
                                    this.props.deleteFriendship(id.id)
                                }
                                }
                                className="card-link">Delete</a>
                        </div>

                    )
                    }
                </section>
            </React.Fragment>
        )
    }
}



export default FriendsList