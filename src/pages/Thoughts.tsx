import { FormEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Form,
  FormGroup,
  FormText,
  FormControl,
  FormLabel,
} from "react-bootstrap";

export default function Thoughts() {
  // these are hooks. they
  // 1. can only be used within function components, NOT class components.
  // 2. cannot be put in loops, conditional statements, they are called in the exact same order!
  // 3. useState will always return two values, state and function to update state.
  const [state, setState] = useState(false);
  const handleShow = () => setState(true);
  const handleClose = () => setState(false);
  const [textState, updateTextState] = useState("");

  // useEffect is supplied with a function that gets called whenever the supplied input array changes
  // add a return function as a "cleanup" call

  return (
    <div className="content-container">
      <Button variant="outline-dark" size="lg" onClick={handleShow}>
        New Thought ✍️
      </Button>
      <Modal show={state} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>New thought 💭</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <FormControl
                as="textarea"
                rows={10}
                value={textState}
                onChange={handleOnTextBoxChange}
              ></FormControl>
            </FormGroup>
          </Form>
          <div className="stats-for-nerds d-flex flex-column align-items-end pt-3">
            <div>
              <b>
                <u>Stats for nerds 🤓</u>
              </b>
            </div>
            <div>Character count: {textState.length}</div>
            <div>Word count: {textState.split(/[^A-Za-z]/).length}</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes 💾
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  function handleFormSubmit(e: FormEvent) {
    // pressing enter should not submit form!
    e.preventDefault();
  }

  function handleOnTextBoxChange(e: FormEvent) {
    updateTextState((prevState) => e.target.value);
  }
}
