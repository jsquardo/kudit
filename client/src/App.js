import React, { Component } from "react";
import axios from "axios";
import validator from "validator";
import "./App.css";

class App extends Component {
	state = {
		url: "",
		link: ""
	};

	handleChange = e => {
		this.setState({
			url: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		// Using validator to check for valid URL's
		const validURL = validator.isURL(this.state.url, {
			require_protocol: true
		});
		if (!validURL) {
			alert(
				"Please ensure this url is correct and includes the http(s) protocol."
			);
		} else {
			console.log("URL is: ", this.state.url);
			// Post values
			axios
				.post("http://localhost:5000/api/shorten", {
					url: this.state.url
				})
				.then(res => {
					console.log(res.data.hash);
					this.setState({
						link: `http://kudd.it/${res.data.hash}`
					});
				})
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<div className="App">
				<form onSubmit={this.handleSubmit}>
					<fieldset>
						<input
							type="text"
							name="url"
							placeholder="Enter URL including the http(s) protocol"
							onChange={this.handleChange}
						/>
						<input type="submit" value="shorten" />
					</fieldset>
					<fieldset>
						<span id="result">{this.state.link}</span>
					</fieldset>
				</form>
			</div>
		);
	}
}

export default App;
