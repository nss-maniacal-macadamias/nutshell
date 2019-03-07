import React, { Component } from "react";
import TaskManager from "../../modules/resourceManagers/TaskManager";




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
        if (this.state.taskName === "" || this.state.completionDate === "") {
            window.alert("Please fill out all fields!");
        } else { 
        evt.preventDefault();
        const task = {
            id: this.props.match.params.taskId,
            taskName: this.state.taskName,
            completionDate: this.state.completionDate,
            // Make sure the employeeId is saved to the database as a number since it is a foreign key.
            userId: Number(sessionStorage.getItem("credentials")),
            completionStatus: Boolean(this.state.completionStatus)


        };

        // Create the animal and redirect user to animal list
        this.props
            .editTask(task)
            .then(() => this.props.history.push("/tasks"));
    }

};

componentDidMount() {
    TaskManager.GET(this.props.match.params.taskId)
        .then(task => {
            this.setState({
                taskName: task.taskName,
                completionDate: task.completionDate,
                userId: Number(sessionStorage.getItem("credentials")),
                completionStatus: task.completionStatus
            });
        });
}

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
                        value={this.state.taskName}
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
                        value={this.state.completionDate}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="taskName">Completed</label>
                    <input type="checkbox"
                        name="completed"
                        value="true"
                        onChange={this.handleFieldChange}

                        id="completionStatus" />
                </div>
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