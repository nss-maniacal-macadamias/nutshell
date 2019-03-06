import React, { Component } from 'react'
import { Link } from "react-router-dom";




class TaskList extends Component {

    render() {

        return (
            <React.Fragment>
                <button type="button"
                    onClick={() => this.props.history.push("/tasks/new")}
                    className="btn btn-success">
                    Add Task
                    </button>
                <section className="tasks container" >
                    <h1>Task List</h1>
                    {this.props.tasks.filter(task => task.userId === Number(sessionStorage.getItem("credentials")))
                        .map(task =>
                            <div key={task.id}>
                                {task.taskName} <br />
                                {task.completionDate} <br />
                                Completed: {
                                    task.completionStatus ? "completed" : "not yet"} <br />
                                <a href="#"
                                    onClick={() => this.props.deleteTask(task.id)}
                                    className="card-link">Delete</a>
                            </div>

                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}



export default TaskList