import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Task from "./task";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

export default function Tasks() {
  const [inputValue, setInputValue] = useState("");
  const [showTasks, setShowTasks] = useState(true);
  const [errorText, setErrorText] = useState("");
  const [tasks, setTasks] = useState([]);
  
  const handleAddTask = (e) => {
    e.preventDefault();
    if (inputValue) {
      setErrorText("");
      const newTasks = [...tasks];
      const newTask = {
        id: Math.floor(Math.random() * 1000),
        text: inputValue,
        isCompleted: false,
      };
      newTasks.push(newTask);
      setTasks(newTasks);
      setInputValue("");
    } else {
      setErrorText("Please write a task");
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const handleEdit = (inputElem, id) => {
    if (inputElem.value) {
      setErrorText("");
      const taskIndex = tasks.findIndex((task) => task.id === id);
      const newTasks = [...tasks];
      newTasks[taskIndex].text = inputElem.value;
      setTasks(newTasks);
    } else {
      setErrorText("Please write a task");
    }
  };

  const handleCompleteTask = (id) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const newTasks = [...tasks];
    newTasks[taskIndex].isCompleted = !newTasks[taskIndex].isCompleted;
    setTasks(newTasks);
  };
  
  return (
    <>
      <h1>Task App</h1>
      <Form noValidate onSubmit={handleAddTask}>
        <InputGroup>
          <FormControl
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // required
            isInvalid={errorText}
          />
          <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
          <Button type="submit" variant="outline-success" onClick={handleAddTask}>
            Add task
          </Button>
          <Button variant="outline-info" onClick={() => setShowTasks(!showTasks)}>
            Show tasks
          </Button>
        </InputGroup>
      </Form>
      {showTasks && (
        <>
          <Table className="table-task" striped bordered hover>
            <thead>
              <tr>
                <td>ID</td>
                <td>Task</td>
                <td>Done</td>
                <td>Delete</td>
                <td>Edit</td>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    text={task.text}
                    isCompleted={task.isCompleted}
                    completeItem={handleCompleteTask}
                    deleteItem={handleDeleteTask}
                    editItem={handleEdit}
                  />
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
}
