import React, { Component } from 'react'
import { Link } from "react-router-dom";




class TaskList extends Component {

    render() {
        let loggedInUserId = Number(sessionStorage.getItem("credentials"))
        return (
            
            <section className="tasks container" >
            <h1>Task List</h1>
            { this.props.tasks.filter(task => task.userId === Number(sessionStorage.getItem("credentials")))
                .map(task =>
                    <div key={task.id}>
                        {task.taskName} <br />
                        {task.completionDate} <br />
                        Completed: {
                            task.completionStatus ? "completed": "not yet"} <br />
                    </div>
                    
                )
            }
            </section>
        )
    }
}



export default TaskList