import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../service/Userservice';
import { toast } from 'react-toastify';

function ModalDeleteUser(props) {

  const {show,handleClose,dataUserDelete,handleDeleteUserFromModal}=props;
  const [name,setName] = useState('');
  const [job,setJob] = useState('');

  const handleDelete = async () =>{
    let res = await deleteUser(dataUserDelete.id);
    console.log(res);
    if(+res===204){
      toast.success("Delete user success");
      handleDeleteUserFromModal(dataUserDelete);
      handleClose();
    }
  }
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-delete-user'>
                <span>This action is undo. Do you want to delete user ? email=</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" className='btn btn-danger' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;