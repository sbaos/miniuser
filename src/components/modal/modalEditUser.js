import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../service/Userservice';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../service/Userservice';

function ModalEditUser(props) {

  const {show,handleClose,dataUserEdit,setDataUserEdit}=props;
  const [fname,setFName] = useState('');
  const [lname,setLName] = useState('');
  const [email,setEmail] = useState('');

  const [job,setJob] = useState('');

  useEffect(()=>{
    if(show){
        setFName(dataUserEdit.first_name);
        setLName(dataUserEdit.last_name);
        setEmail(dataUserEdit.email);
    }
  },[dataUserEdit])
  const handleEditUser = async () =>{
    let res = await putUpdateUser(fname,lname,dataUserEdit.id);
    if(res&&res.updatedAt){
      dataUserEdit.first_name = fname;
      dataUserEdit.last_name = lname;
      dataUserEdit.email = email;
      toast.success("Edit user success");
      // setDataUserEdit({...dataUserEdit,"first_name": fname,"last_name": lname,"email": email});
      handleClose();
    }
    // console.log(res);

  }
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
              <form>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input 
                  type="text" 
                  className="form-control"
                  value={fname}
                  onChange={(e)=>setFName(e.target.value)}/>
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input 
                  type="text" 
                  className="form-control"
                  value={lname}
                  onChange={(e)=>setLName(e.target.value)}/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input 
                  type="email" 
                  className="form-control"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                {/* <button type="submit" class="btn btn-primary">Submit</button> */}
              </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditUser;