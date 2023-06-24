import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

export interface ThoughtProps {
  id: string;
  title: string;
  text: string;
  author: string;
  date: string;
  onDelete: (id: string) => void;
}

export default function ThoughtPost(props: ThoughtProps) {
  const [state, setState] = useState({ id: props.id, showDeleteModal: false });

  return (
    <>
      <Modal
        show={state.showDeleteModal}
        onHide={() => {
          toggleDeleteModal(false);
        }}
      >
        <Modal.Header>Are you sure?</Modal.Header>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              props.onDelete(props.id);
              toggleDeleteModal(false);
            }}
          >
            Delete Forever
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => toggleDeleteModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex flex-column pt-5 align-items-center border-bottom border-secondary-subtle">
        <div key="titlebox" className="titlebox">
          <h3>{props.title}</h3>
        </div>
        <div key="postMetadata" className="postMetadata">
          {props.author} | {props.date} | {editButton()} | {deleteButton()}
        </div>
        <div
          key="textHolder"
          className="pt-3 pb-3"
          style={{
            width: "50%",
          }}
        >
          <div key="actualThoughtText">
            {props.text.split("\n").map((frag, index) => (
              <div key={`frag-${props.id}:${index}`}>{frag}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  function toggleDeleteModal(on: boolean) {
    setState((prevState) => {
      return { ...prevState, showDeleteModal: on };
    });
  }

  function deleteButton() {
    return (
      <Button
        variant="variant-light"
        size="sm"
        onClick={() => toggleDeleteModal(true)}
      >
        🗑️
      </Button>
    );
  }

  function editButton() {
    return (
      <Button variant="variant-light" size="sm">
        ✏️
      </Button>
    );
  }
}
