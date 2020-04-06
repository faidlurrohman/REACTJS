import React, { Component } from "react";
import "./App.css";
import { Form, Button, Card, ButtonToolbar, Modal } from "react-bootstrap";
import axios from "axios";
import {
  FaPlusCircle,
  FaTrashAlt,
  FaEdit,
  FaTimesCircle,
  FaCheckCircle
} from "react-icons/fa";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      urlTodo: "https://btm-rn.herokuapp.com/api/v1/todo/",
      todoData: [],
      showModal: false,
      todoAdd: "",
      editId: "",
      showEdit: false
    };
  }

  getTodo = () => {
    axios.get(this.state.urlTodo).then(res => {
      this.setState({
        todoData: res.data.results
      });
    });
  };

  componentDidMount = () => {
    this.getTodo();
  };

  checkTodo = e => {
    this.setState({
      todoAdd: e.target.value
    });
  };

  saveTodo = e => {
    e.preventDefault();
    if (this.state.todoAdd === "") {
      this.setState({ showModal: true });
    } else {
      let procAdd = {
        title: this.state.todoAdd
      };
      axios.post(this.state.urlTodo, procAdd).then(this.getTodo);
    }
  };

  deleteTodo = gotcha => e => {
    e.preventDefault();
    axios.delete(this.state.urlTodo + gotcha).then(this.getTodo);
  };

  goingEdit = gotcha => e => {
    e.preventDefault();
    axios.get(this.state.urlTodo + gotcha).then(res => {
      this.setState({
        todoAdd: res.data.results.title,
        editId: gotcha,
        showEdit: true
      });
    });
  };

  editTodo = e => {
    e.preventDefault();
    axios({
      method: "put",
      url: this.state.urlTodo + this.state.editId,
      data: {
        title: this.state.todoAdd
      }
    })
      .then(
        this.setState({
          showEdit: false
        })
      )
      .then(this.getTodo);
  };

  statusTodo = gotcha => e => {
    e.preventDefault();
    axios({
      method: "put",
      url: this.state.urlTodo + gotcha,
      data: {
        isComplete: true
      }
    }).then(this.getTodo);
  };

  cancelEdit = () => {
    this.setState({
      showEdit: false
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>TodoList App</h1>
        </div>
        <Modal
          size="sm"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          centered
        >
          <Modal.Header closeButton>
            inputannya jangan dikosongin dong sayaang...
          </Modal.Header>
          {/* <Modal.Body></Modal.Body> */}
        </Modal>

        <div
          className="FormSave"
          style={{ display: this.state.showEdit === false ? "" : "none" }}
        >
          <Form onSubmit={this.saveTodo}>
            <Form.Group>
              <Form.Control
                onChange={this.checkTodo}
                as="textarea"
                rows="3"
                placeholder="Tambahkan aktifitas kamu disini sayaang..."
              />
            </Form.Group>
            <Button type="submit" size="sm" variant="success">
              <FaPlusCircle /> Add
            </Button>
          </Form>
        </div>
        <div
          className="FormEdit"
          style={{ display: this.state.showEdit === true ? "" : "none" }}
        >
          <Form onSubmit={this.editTodo}>
            <Form.Group>
              <Form.Control
                onChange={this.checkTodo}
                as="textarea"
                rows="3"
                value={this.state.todoAdd}
              />
            </Form.Group>
            <Button size="sm" variant="danger" onClick={this.cancelEdit}>
              <FaTimesCircle /> Cancel
            </Button>
            &nbsp;
            <Button type="submit" size="sm" variant="info">
              <FaCheckCircle /> Save
            </Button>
          </Form>
        </div>
        <div
          className="todoList"
          style={{ display: this.state.showEdit === false ? "" : "none" }}
        >
          {this.state.todoData.map(nha => {
            return (
              <div className="cardTodo" key={nha._id}>
                {nha.isComplete !== true ? (
                  <Card>
                    <Card.Body>
                      <Form.Group
                        controlId="formBasicCheckbox"
                        onClick={this.statusTodo(nha._id)}
                      >
                        <Form.Check type="switch" label={nha.title} />
                      </Form.Group>
                      <ButtonToolbar>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={this.goingEdit(nha._id)}
                        >
                          <FaEdit />
                        </Button>
                        &nbsp;
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.deleteTodo(nha._id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </ButtonToolbar>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card bg="secondary">
                    <Card.Body>
                      <Form.Group
                        controlId="formBasicCheckbox"
                        onClick={this.statusTodo(nha._id)}
                      >
                        <Form.Check
                          type="switch"
                          label={nha.title}
                          defaultChecked
                          disabled
                        />
                      </Form.Group>
                      <ButtonToolbar>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={this.deleteTodo(nha._id)}
                        >
                          <FaTrashAlt />
                        </Button>
                      </ButtonToolbar>
                    </Card.Body>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
