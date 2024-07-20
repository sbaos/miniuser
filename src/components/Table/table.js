import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../../service/Userservice';
import axios from '../../service/customizeAxios';
import { useEffect, useState, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Modal from '../modal/modalAddNewUsers'
import ModalEditUser from '../modal/modalEditUser';
import ModalDeleteUser from '../modal/modalDeleteUser.js';
import _, { debounce } from 'lodash';
import { FaArrowDownLong, FaArrowUpLong, FaCirclePlus } from "react-icons/fa6";
import { FaFileUpload, FaFileDownload } from "react-icons/fa";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import './table.scss'
import { toast } from 'react-toastify';
// import 'bootstrap/dist/css/bootstrap.min.css';
function BasicExample(props) {
  const id = useRef(30);
  // const {users, setUsers} = props;
  const [users, setUsers] = useState([]);

  const [show, setShow] = useState(false);

  const [showedit, setShowEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [showdelete, setShowDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});
  const deletesuccess = useRef(false);

  const [sortField, setSortField] = useState('id');
  const [sortby, setSortby] = useState('asc');

  const [keywork, setKeywork] = useState('');
  const [dataExport, setDataExport] = useState([]);
  function handleAddNewUser() {
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

  const handlePageClick = (e) => {
    getUsers(+e.selected + 1);
    // console.log((+e.selected+1));
  }
  function hselect(e) {
    let itemClassList = e.target.parentElement.classList;
    while (!itemClassList.contains("row-m")) itemClassList = e.target.parentElement.parentElement.classList;
    if (!itemClassList.contains("table-success")) itemClassList.add("table-success");
    else itemClassList.remove("table-success");
  }
  function handleEditUser(user) {
    setDataUserEdit(user);
    setShowEdit(true);
    console.log("run from table");
    // handleEditUserFromModal();
  }

  function handleEditUserFromModal() {
    // let list = _.clone(users);
    // let t = null;
    // list.forEach((e, index) => { if (e.id === dataUserEdit.id) t = index });
    // console.log("run from table 1");
    // if (t) {
    //   list[t] = dataUserEdit;
    //   console.log(dataUserEdit);
    //   console.log("run from table  2");

    //   setUsers(list);
    // }
    // console.log("run from table 3");

  }
  const handleDeleteUser = (user) => {
    setShowDelete(true);
    setDataUserDelete(user);
  }
  useEffect(() => {
    console.log(dataUserEdit);
  })
  const handleDeleteUserFromModal = (user) => {
    let listUserClone = _.clone(users);
    listUserClone = listUserClone.filter(e => e.id !== user.id);
    setUsers(listUserClone);
  }
  function handleClose() {
    setShowEdit(false);
    setShowDelete(false);
    setShow(false);
  }
  function handleSort(sortby, sortField) {
    setSortField(sortField);
    setSortby(sortby);

    let sortList = _.orderBy(users, [sortField], [sortby]);
    setUsers(sortList);
  }
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      // getUsers();
      //thuc te khuc nay chi can goi api tu backend la duoc
      console.log(e.target.value);
      let cloneList = _.clone(users);
      cloneList = cloneList.filter((item) => item.email.includes(term));
      console.log(cloneList);
      setUsers(cloneList);
    } else {
      getUsers();
    }
  }, 500);
  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  ];
  const getUsersExport = (event, done) => {
    let result = [];
    if (users && users.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      users.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
    }
    setDataExport(result);
    done();
  }
  const handleImportcsv = (event) => {
    if (event.target?.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("File is not valid");
        return;
      }
      console.log(file)
      if (+file.size > 3000) {
        toast.error("File is out of size");
        return;
      }
      let ans = [];
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV[0].length === 3) {
            if (rawCSV[0][0] !== 'email'
              || rawCSV[0][1] !== 'first_name'
              || rawCSV[0][2] !== 'last_name'
            ) {
              toast.error("Format is wrong");
            } else {

              rawCSV.map((e, index) => {
                if (index > 0 && e.length === 3) {
                  let obj = {};
                  obj.email = e[0];
                  obj.first_name = e[1];
                  obj.last_name = e[2];
                  ans.push(obj);
                }
              });
              setUsers(ans);
              toast.success("Import file success");
            }

          } else
            toast.error("File is not valid");
          // console.log("Finished:", results.data);
        }
      });


    }

  }
  return (
    <>
      <div className='my-3 d-sm-flex justify-content-between table-container' style={{ alignItems: 'center' }}>
        <span><b>
          List users
        </b></span>

        <div className='my-3 group-btns'>
          <label htmlFor='import-csv' className='btn btn-success'>
            <FaFileUpload ></FaFileUpload>
            Import
          </label>
          <input type='file' id='import-csv' hidden
            onChange={(event) => handleImportcsv(event)}
          />
          <CSVLink
            data={dataExport}
            filename={"my-file.csv"}
            onClick={getUsersExport}
            asyncOnClick={true}
            className="btn btn-primary">
            <FaFileDownload className='icon-react'></FaFileDownload>
            Export
          </CSVLink>
          <button
            className='btn btn-success'
            onClick={() => setShow(true)}>
            <FaCirclePlus className='icon-react'>
            </FaCirclePlus>
            <span>Add User</span>
          </button>
        </div>
      </div>
      <div className='col-12 col-sm-4 my-3 '>
        <input
          type='text'
          className='form-control'
          placeholder='Search user by email...'
          // value={keywork}
          onChange={(e) => { handleSearch(e) }}
        />
      </div>
      <div className='table-customize'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>
                <div className='id-name field-name'>
                  <div>
                    ID
                  </div>
                  <div className='arrow'>
                    <FaArrowDownLong onClick={() => { handleSort('desc', 'id'); }} />
                    <FaArrowUpLong onClick={() => { handleSort('asc', 'id'); }} />
                  </div>
                </div>
              </th>
              <th>First Name</th>
              <th>
                <div className='lastname-name field-name'>
                  <div>
                    Last Name
                  </div>
                  <div className='arrow'>
                    <FaArrowDownLong onClick={() => { handleSort('desc', 'last_name'); }} />
                    <FaArrowUpLong onClick={() => { handleSort('asc', 'last_name'); }} />
                  </div>
                </div>
              </th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((e, index) => {
              return <tr className='row-m' key={`users-${index}`} onClick={(e) => { hselect(e) }}>
                <td>{e.id < 10 ? '0' + e.id : e.id}</td>
                <td>{e.first_name}</td>
                <td>{e.last_name}</td>
                <td>{e.email}</td>
                <td>
                  <button
                    className='btn btn-warning mx-1 mx-sm-3'
                    onClick={() => { handleEditUser(e) }}
                  >Edit</button>
                  <button className='btn btn-danger m-1 m-sm-0' onClick={() => { handleDeleteUser(e) }}>Delete</button>
                </td>
              </tr>
            })}

          </tbody>
        </Table>
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={(e) => handlePageClick(e)}
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