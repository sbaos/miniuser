import { useEffect, useState } from 'react';
import './App.scss';
import Nav from './components/Nav/nav'
import Table from './components/Table/table';
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from 'react-toastify';


function App() {

  return (
    <>
      <div className="App">
        <Nav></Nav>
        <Container>
          
          <Table ></Table>
        
        </Container>
      </div>
      <div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition: Bounce
        />
      </div>
    </>
   
  );
}

export default App;
