import React, { useState, useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";

function Task({ id, text, isCompleted, deleteItem, editItem, completeItem }) {
  const editItemInputRef = useRef(null);

  return (
    <tr>
      <td>{id}</td>
      {isCompleted ? (
        <td>
          <del>{text}</del>
        </td>
      ) : (
        <td>{text}</td>
      )}
      <td>
        <Form.Check
          type="checkbox"
          checked={isCompleted}
          onChange={() => completeItem(id)}
        />
      </td>
      <td>
        <Button variant="danger" onClick={() => deleteItem(id)}>
          <BsTrash></BsTrash>
        </Button>
      </td>
      <td>
        <Form>
          <InputGroup>
            <FormControl
              type="text"
              ref={editItemInputRef}
              placeholder={`Edit ${text}`}
            />
            <Button
              variant="outline-dark"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                editItem(editItemInputRef.current, id);
              }}
            >
              ✅
            </Button>
          </InputGroup>
        </Form>
      </td>
    </tr>
  );
}

export default Task;
