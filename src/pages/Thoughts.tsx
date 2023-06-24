import { FormEvent, useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import Thought from "../models/Models";
import ThoughtPost from "../components/Thought";
import axios from "axios";

interface State {
  showModal: boolean;
  textBoxState: string;
  allThoughts: Thought[];
}

function initState(): State {
  return {
    showModal: false,
    textBoxState: "",
    allThoughts: [],
  };
}

export default function Thoughts() {
  // these are hooks. they
  // 1. can only be used within function components, NOT class components.
  // 2. cannot be put in loops, conditional statements, they are called in the exact same order!
  // 3. useState will always return two values, state and function to update state.

  const [state, setState] = useState(() => initState());

  // useEffect is supplied with a function that gets called whenever the supplied input array changes
  // add a return function as a "cleanup" call
  useEffect(() => {
    console.log("onMount");
    axios.get("http://localhost:5000/thought/getAll").then((r) => {
      // By default sort by recency
      const retrievedThoughts: Thought[] = r.data.allThoughts;
      retrievedThoughts.sort(
        (t1, t2) => t2.createTimeEpochMs - t1.createTimeEpochMs
      );

      setState((prevState) => {
        return { ...prevState, allThoughts: retrievedThoughts };
      });
    });
  }, []);

  return (
    <div className="content-container">
      <Button
        variant="outline-dark"
        size="lg"
        onClick={() => toggleModal(true)}
      >
        New Thought ✍️
      </Button>
      {state.allThoughts.map((thought, index) => (
        <ThoughtPost
          id={thought.tid}
          key={`thought-${index}`}
          title={"Journal Entry"}
          text={thought.text}
          author="Danny"
          date={thought.createDate}
          onDelete={handleDeleteThought}
        />
      ))}
      <Modal
        show={state.showModal}
        onHide={() => toggleModal(false)}
        size="xl"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>New thought 💭</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <FormControl
                as="textarea"
                rows={10}
                value={state.textBoxState}
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
            <div>Character count: {state.textBoxState.length}</div>
            <div>
              Word count: {state.textBoxState.split(/[^A-Za-z]/).length}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => toggleModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormSubmit}>
            Save Changes 💾
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );

  function toggleModal(on: boolean) {
    setState((prevState) => {
      return { ...prevState, showModal: on };
    });
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();

    // TODO: this needs to return ID!
    axios
      .post(
        "http://localhost:5000/thought/create",
        { thoughtData: state.textBoxState },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setState((prevState) => {
          const now = new Date();
          const dateTimeString = `${now.getFullYear()}-${
            now.getMonth() + 1
          }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

          const newThought = {
            text: state.textBoxState,
            createDate: dateTimeString,
            tid: response.data.tid,
            createTimeEpochMs: now.getTime(),
          };

          return {
            ...prevState,
            allThoughts: [newThought, ...state.allThoughts],
            showModal: false,
            textBoxState: "",
          };
        });
      });
  }

  function handleOnTextBoxChange(e: FormEvent) {
    setState((prevState) => {
      return {
        ...prevState,
        textBoxState: e.target.value,
      };
    });
  }

  function handleDeleteThought(id: string): void {
    axios
      .delete(`http://localhost:5000/thought/delete/${id}`)
      .then((response) => {
        const success: boolean = response.data.success;
        if (success) {
          const updatedThoughts = state.allThoughts.filter((t) => t.tid != id);
          console.log(`Updated thoughts: ${updatedThoughts}`);
          setState((prevState) => {
            return { ...prevState, allThoughts: [...updatedThoughts] };
          });
        }
      });
  }
}
