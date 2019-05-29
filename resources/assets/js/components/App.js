import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			tasks: []
		};
		// bind
		this.onChangeHandeler = this.onChangeHandeler.bind(this);
		this.onSubmitHandeler = this.onSubmitHandeler.bind(this);
		this.renderTasks = this.renderTasks.bind(this);
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
			.post('/tasks', {
				name: this.state.name
			})
			.then((response) => {
				this.setState({
					tasks: [ response.data, ...this.state.tasks ],
					name: ''
				});
				// console.log('form handle submit',this.state.tasks['name']);
			});
	}
	renderTasks() {
		return this.state.tasks.map((task) => (
			<ul key={task.id}>
				<li key={task.id}>
					{task.name}

					<button
						className="btn btn-danger float-right"
						data-index={task.id}
						onClick={() => this.deleteTask(task.id)}
					>
						delete
					</button>
					<Link to={`/${task.id}/edit`} className="btn btn-success float-right">
						Edit
					</Link>
				</li>
				<hr />
			</ul>
		));
	}
	deleteTask(index) {
		axios.delete('/tasks/' + index).then((response) => {
			if (response.data.status === true) {
				this.getTasks();
			}
		});
	}
	getTasks() {
		axios.get('/tasks').then((response) =>
			this.setState({
				tasks: [ ...response.data.tasks ]
			})
		);
	}
	componentWillMount() {
		this.getTasks();
	}
	render() {
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
									<button type="submit" className="btn btn-primary">
										Create
									</button>
								</form>
								<hr />
								<h1>Tasks</h1>
								<br />
								{this.renderTasks()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
