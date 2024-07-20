import { Routes, Route, Link } from "react-router-dom";
import Home from '../components/home/home.js';
import Login from '../components/Login/Login.js';
import Background from '../Bg.js';
import Table from '../components/Table/table';
import PrivateRoutes from "./privateRoutes.js";
import NotFound from "./NotFound.js";

const AppRoutes = () => {

    return (<>
        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<><Login /> <Background></Background></>} />
            <Route path="/users" element={
                <PrivateRoutes path="/users" >
                    <Table></Table>
                </PrivateRoutes>}>
            </Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
        {/* <privateRoutes></privateRoutes> */}

    </>);
}
export default AppRoutes;