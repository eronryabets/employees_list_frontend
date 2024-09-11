import styles from './ModalSuccess.module.scss';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {useState} from "react";

interface ModalSuccessProps {
    success: boolean;
}

export const ModalSuccess = ({success}: ModalSuccessProps) => {

    const [show, setShow] = useState(success);
    const handleClose = () => setShow(false);

     return (
        <div className={styles.modalDeleteButton}>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Employee added successfully!</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
