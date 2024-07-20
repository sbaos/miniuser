import { useContext, useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header/header.js'
import Container from 'react-bootstrap/esm/Container';
import { ToastContainer } from 'react-toastify';
import { UserContext } from './context/UserContext.js';
import AppRoutes from './routes/approute.js';
function App() {
  const { user, loginContext } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(localStorage.getItem("email"), localStorage.getItem("token"));
    }
  }, [])
  return (
    <>
      <div className="App">
        <Header></Header>
        <Container>
          <AppRoutes></AppRoutes>
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
