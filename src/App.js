import React, { Component } from "react";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      name: "",
      age: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getData = () => {
    axios.get("https://btm-rn.herokuapp.com/api/v1/users/").then(res => {
      this.setState({
        results: res.data.results
      });
    });
  };

  componentDidMount() {
    this.getData();
  }

  handleChange = event => {
    let muse = event.target.name;
    let sum41 = event.target.value;
    this.setState({ [muse]: sum41 });
  };

  handleSubmit = event => {
    event.preventDefault();
    let slipknot = {
      name: this.state.name,
      age: this.state.age
    };
    axios
      .post("https://btm-rn.herokuapp.com/api/v1/users/", slipknot)
      .then(this.getData);
  };

  handleDelete = linkinpark => event => {
    event.preventDefault();
    axios
      .delete("https://btm-rn.herokuapp.com/api/v1/users/" + linkinpark)
      .then(this.getData);
  };

  render() {
    return (
      <div style={{ margin: 20 }}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              onChange={this.handleChange}
              required
            />
          </label>
          &nbsp; &nbsp;
          <label>
            Age:
            <input
              type="number"
              name="age"
              onChange={this.handleChange}
              required
            />
          </label>
          &nbsp; &nbsp;
          <input type="submit" value="Add Data" />
        </form>
        <br></br>
        <hr></hr>
        {this.state.results.map(korn => {
          return (
            <ul key={korn._id}>
              <li>{korn.name}</li>
              <li>{korn.age}</li>
              <a href="" onClick={this.handleDelete(korn._id)}>
                Delete
              </a>
            </ul>
          );
        })}
      </div>
    );
  }
}
