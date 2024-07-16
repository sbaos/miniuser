import Table from 'react-bootstrap/Table';
import fetchAllUsers from '../../service/Userservice';
import axios from '../../service/customizeAxios';
import { useEffect,useState,useRef } from 'react';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';
function BasicExample() {
    const id = useRef(30);
    const [users, setUsers] = useState([]);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    // const [page,setpage]= useState(0);
    useEffect(() => {
      getUsers(1);
    }, []);
    
  const getUsers = async (page) => {
    // let t = await axios.get('https://reqres.in/api/users?page=1');
    // let t = await axios.get('http://localhost:3000/api');

    let t = await fetchAllUsers(page);
    setUsers(t.data);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
  return (
    <>
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
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
                              <button className='btn btn-danger' onClick={()=>{}}>remove</button>
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
   </>

  );
}

export default BasicExample;