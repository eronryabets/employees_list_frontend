import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalDeleteButton.module.scss';

interface ModalDeleteButtonProps {
  onDelete: () => void; // Передаем функцию удаления
}

export const ModalDeleteButton = ({onDelete}: ModalDeleteButtonProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = () => {
    onDelete(); // Выполняем функцию удаления
    handleClose(); // Закрываем модальное окно после удаления
  };

  return (
    <div className={styles.modalDeleteButton}>
      <Button className={styles.deleteButton}
              variant="outline-danger" onClick={handleShow}>
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this employee?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
