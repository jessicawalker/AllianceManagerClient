import React from 'react';
import { Button, Modal } from "react-bootstrap";

export default function DeleteModal(props) {
    const { onDelete, dataToDelete, ...rest } = props;
    return (
        <>
            <Modal
                {...rest}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    Confirm Deletion
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Make sure you mean to delete this item. This action is permanent.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onDelete}>Delete Permanently</Button>
                    <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
