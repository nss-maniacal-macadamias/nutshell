import React, { Component } from "react";


export default class TaskEditForm extends Component {
    // Set initial state
    state = {
        
        taskName: "",
        completionDate: "",
        userId: Number(sessionStorage.getItem("credentials")),
        completionStatus: ""
    };

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        
        this.setState(stateToChange);
    };

    /*
          Local method for validation, creating animal object, and
          invoking the function reference passed from parent component
       */
    editTask = evt => {
        evt.preventDefault();
        const task = {
            id: this.props.match.params.task.id,
            taskName: this.state.taskName,
            completionDate: this.state.completionDate,
            // Make sure the employeeId is saved to the database as a number since it is a foreign key.
            userId: Number(sessionStorage.getItem("credentials")),
            completionStatus: true


        };

        // Create the animal and redirect user to animal list
        this.props
            .editTask(task)
            .then(() => this.props.history.push("/tasks"));

    };

    render() {
        return (
            <React.Fragment>
                <form className="taskForm">
                    <div className="form-group">
                        <label htmlFor="taskName">Task name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="taskName"
                            placeholder="Task name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="completionDate">Completion Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="completionDate"
                            placeholder="completionDate"
                        />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="taskName">Completed</label>
                        <input type="checkbox" 
                        name="completed" 
                        value=""
                        id="completionStatus"/>
                    </div> */}
                    <button
                        type="submit"
                        onClick={this.editTask}
                        className="btn btn-primary"
                    >
                        Submit
          </button>
                </form>
            </React.Fragment>
        );
    }
}