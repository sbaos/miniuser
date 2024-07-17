import Table from 'react-bootstrap/Table';
import {fetchAllUsers} from '../../service/Userservice';
import axios from '../../service/customizeAxios';
import { useEffect,useState,useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from '../modal/modalAddNewUsers'
import ModalEditUser from '../modal/modalEditUser';
import ModalDeleteUser from '../modal/modalDeleteUser.js';
import _, { debounce } from 'lodash';
import { FaArrowDownLong,FaArrowUpLong } from "react-icons/fa6";

// import 'bootstrap/dist/css/bootstrap.min.css';
function BasicExample(props) {
    const id = useRef(30);
    // const {users, setUsers} = props;
    const [users, setUsers] = useState([]);

    const [show, setShow] = useState(false);

    const [showedit,setShowEdit] = useState(false);
    const [dataUserEdit,setDataUserEdit] = useState({});

    const [showdelete,setShowDelete] = useState(false);
    const [dataUserDelete,setDataUserDelete] = useState({});
    const deletesuccess = useRef(false);

    const [sortField,setSortField] = useState('id');
    const [sortby,setSortby] = useState('asc');

    const [keywork,setKeywork] = useState('');
    function handleAddNewUser (){
      setShow(true);
    }
    // const [page,setpage]= useState(0);
    useEffect(() => {
      getUsers(1);
    }, []);
    
  const getUsers = async (page) => {
    let t = await fetchAllUsers(page);
    setUsers(t.data);
  };

  const addUser = async (name,email) => {
    // window.alert(name,email);
    axios.post('users?page=1', {
      id: id.current++ +'',
      email: email,
      first_name: name,
      last_name: name,
      avatar: ""
    })
    .then(function (response) {
      console.log(response);
      getUsers(1);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  const r = useRef();
  const remove =  async () => {
    
    axios.delete(`/${r.current.value}`)
    .then(function (response) {
      console.log(response);
      getUsers(1);
    })
  }
  const handlePageClick = (e)=>{
    getUsers(+e.selected+1);
    // console.log((+e.selected+1));
  }
  function hselect(e){
    let itemClassList = e.target.parentElement.classList;
    while(!itemClassList.contains("row-m")) itemClassList=e.target.parentElement.parentElement.classList;
      if(!itemClassList.contains("table-success")) itemClassList.add("table-success");
      else  itemClassList.remove("table-success");
  }
  function handleEditUser(user){
    setDataUserEdit(user);
    setShowEdit(true);
    
    handleEditUserFromModal();
  }

  function handleEditUserFromModal(){
      let list =_.clone(users);
      let t=null;
      list.forEach((e,index)=>{if(e.id===dataUserEdit.id) t =index});
      console.log(t);
      if(t){
        list[t]=dataUserEdit;
        console.log(dataUserEdit);
        setUsers(list);
      }
  }
  const handleDeleteUser = (user) =>{
      setShowDelete(true);
      setDataUserDelete(user);
  }
  const handleDeleteUserFromModal = (user) => {
    let listUserClone = _.clone(users);
    listUserClone = listUserClone.filter(e=>e.id!==user.id);
    setUsers(listUserClone);
  }
  function handleClose(){
    setShowEdit(false);
    setShowDelete(false);
    setShow(false);
  }
  function handleSort(sortby,sortField){
    setSortField(sortField);
    setSortby(sortby);

    let sortList = _.orderBy(users,[sortField],[sortby]);
    setUsers(sortList);
  }
  const handleSearch = debounce((e) =>{
    let term = e.target.value;
    if(term) {
      // getUsers();
      //thuc te khuc nay chi can goi api tu backend la duoc
      console.log(e.target.value);
      let cloneList = _.clone(users);
      cloneList = cloneList.filter((item)=>item.email.includes(term));
      console.log(cloneList);
      setUsers(cloneList);
    }else{
      getUsers();
    }
  },500)
  return (
    <>
        <div className='my-3 d-flex justify-content-between' style={{alignItems:'center'}}>
            <span><b>
            List users
            </b></span>
            <button className='btn btn-success' onClick={()=>setShow(true)}>Add User</button>
        </div>
        <div className='col-5 my-3'>
            <input 
            type='text' 
            className='form-control' 
            placeholder='Search user by email...'
            // value={keywork}
            onChange={(e)=>{handleSearch(e)}}
            />
        </div>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
              <th>
                <div className='id-name field-name'>
                    <div>
                      ID
                    </div>
                    <div>
                      <FaArrowDownLong onClick={()=>{handleSort('desc','id');}}/>
                      <FaArrowUpLong onClick={()=>{handleSort('asc','id');}}/>
                    </div>
                </div>
              </th>
              <th>First Name</th>
              <th>
                <div className='lastname-name field-name'>
                  <div>
                      Last Name
                  </div>
                  <div>
                      <FaArrowDownLong onClick={()=>{handleSort('desc','last_name');}}/>
                      <FaArrowUpLong onClick={()=>{handleSort('asc','last_name');}}/>
                  </div>
                </div>
              </th>
              <th>Email</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {users.map((e,index)=>{ 
                return  <tr className='row-m' key={`users-${index}`} onClick={(e)=>{hselect(e)}}>
                          <td>{e.id<10?'0'+e.id:e.id}</td>
                          <td>{e.first_name}</td>
                          <td>{e.last_name}</td>
                          <td>{e.email}</td>
                          <td>
                              <button 
                              className='btn btn-warning mx-3'
                              onClick={()=>{handleEditUser(e)}}
                              >Edit</button>
                              <button className='btn btn-danger' onClick={()=>{handleDeleteUser(e)}}>Delete</button>
                          </td>
                        </tr> 
            })}
            
        </tbody>
        </Table>
        <ReactPaginate
        nextLabel="next >"
        onPageChange={(e)=>handlePageClick(e)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={2}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
    />
        <Modal 
          show={show}
          handleClose={handleClose}
          users={users}
          setUsers={setUsers}
          ></Modal>
           <ModalEditUser 
          show={showedit}
          handleClose={handleClose}
          dataUserEdit={dataUserEdit}
          setDataUserEdit={setDataUserEdit}
          ></ModalEditUser>
          <ModalDeleteUser
          show={showdelete}
          handleClose={handleClose}
          dataUserDelete={dataUserDelete}
          setDataUserDelete={setDataUserDelete}
          deletesuccess={deletesuccess}
          handleDeleteUserFromModal={handleDeleteUserFromModal}
          ></ModalDeleteUser>
   </>

  );
}

export default BasicExample;