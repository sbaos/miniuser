import { useEffect, useState } from 'react';
import './App.scss';

import axios from './service/customizeAxios';
import Nav from './components/Nav/nav'
import Table from './components/Table/table';
/* The following line can be included in a src/App.scss */
import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
import { useRef } from 'react';
import Container from 'react-bootstrap/esm/Container';
function App() {
 

  return (
    <div className="App">
      <Nav></Nav>
      <br></br>
      <br></br>
      <Container>
        <div className='my-3 d-flex justify-content-between' style={{alignItems:'center'}}>
          <span><b>
          List users
          </b></span>
          <button className='btn btn-success'>Add User</button>
        </div>
        <Table></Table>
      </Container>
    </div>
  );
}

export default App;
