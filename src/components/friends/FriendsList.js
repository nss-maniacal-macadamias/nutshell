import React, { Component } from 'react'
// import { Link } from "react-router-dom";
// import "./Task.css"




class FriendsList extends Component {

    render() {
        const friendsIds = this.props.friendships.filter(friendship => friendship.userId === Number(sessionStorage.getItem("credentials")))
        .map(friendship => friendship.friendId)
        console.log(friendsIds)
       let friends = this.props.users.filter(user => 
            friendsIds.includes(user.id))
        
        // console.log(this.props.users.filter(user => user.id === friendsIds[1]))
        // this.props.users.filter(users => users.id === friendsIds).map(users.userName)
        
        return (
            <React.Fragment>
                <section className="friends container" >
                    <h1>Friends List</h1>
                    <button type="button"
                        onClick={() => this.props.history.push("/friends/new")}
                        className="btn btn-success">
                        Find Friend
                    </button>
                    {console.log(friends)}
                    {friends
                        .map(friend =>
                            <div key={friend.id} className="friend container">
                                {friend.username} <br />
                                {/* {task.completionDate} <br />
                                Completed: {
                                    task.completionStatus ? "completed" : "not yet"} <br />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.history.push(`/tasks/${task.id}/edit`);
                                    }}
                                >
                                    Edit
                                </button> <br></br>
                                <a href="#"
                                    onClick={() => this.props.deleteTask(task.id)}
                                    className="card-link">Delete</a> */}
                            </div>

                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}



export default FriendsList