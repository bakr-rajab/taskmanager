import React, { Component } from "react";
import axios from "axios";

class TaskEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            task: []
        };
        // bind
        this.onChangeHandeler = this.onChangeHandeler.bind(this);
        this.onSubmitHandeler = this.onSubmitHandeler.bind(this);
    }
    // handel change functions
    onChangeHandeler(e) {
        this.setState({
            name: e.target.value
        });
    }
    onSubmitHandeler(e) {
        e.preventDefault();
        axios
            .put(`/tasks/${task.id}/edit`, {
                name: this.state.name
            })
            .then();
        // console.log('form handle submit',this.state.tasks['name']);
    }
    getTasks() {
        axios.get("/tasks").then(response =>
            this.setState({
                task: [...response.data.task]
            })
        );
    }
    componentWillMount() {
        this.getTasks();
    }
    render() {
        console.log(this.props.match.params.id);
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Create New Task</div>
                            <div className="card-body">
                                <form onSubmit={this.onSubmitHandeler}>
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            onChange={this.onChangeHandeler}
                                            value={this.state.name}
                                            placeholder="type new task"
                                            rows="5"
                                            maxLength="225"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskEdit;
