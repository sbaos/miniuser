import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { postCreateUser } from '../../service/Userservice';
import { toast } from 'react-toastify';

function Example(props) {

  const {show,handleClose,users,setUsers}=props;
  const [name,setName] = useState('');
  const [job,setJob] = useState('');

  const handleSave = async () =>{
    let res = await postCreateUser(name,job);
    console.log(res);
    if(res&&res.id){
      handleClose(); 
      setName('');
      setJob('');
      toast.success("add user success");
      setUsers([...users,res])
    }
    else {
      //error
    }
  }
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='body-add-new'>
              <form>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input 
                  type="text" 
                  className="form-control"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}/>
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Job</label>
                  <input 
                  type="text" 
                  className="form-control"
                  value={job}
                  onChange={(e)=>setJob(e.target.value)}/>
                </div>
                {/* <button type="submit" class="btn btn-primary">Submit</button> */}
              </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;