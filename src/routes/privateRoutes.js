import { Route, Routes } from "react-router-dom";
import { UserContext } from '../context/UserContext.js';
import { useContext } from "react";
import Alert from 'react-bootstrap/Alert';

const PrivateRoutes = (props) => {
    const { user, loginContext } = useContext(UserContext);
    if (!(user && user.auth)) {

        return (<>
            <Alert variant="danger" className="mt-3">
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    You need to login to enter this page.
                </p>
            </Alert>
        </>);
    }
    return (<>
        {props.children}
    </>);
}

export default PrivateRoutes;