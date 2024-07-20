import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { loginApi } from "../../service/Userservice";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPasswork] = useState('');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [loadingApi, setLoadingAPI] = useState(false);

    const navigate = useNavigate();
    const { user, loginContext } = useContext(UserContext);
    useEffect(() => {
        if (user && user.auth) {
            navigate('/');
        }
    })
    const handleeys = (event) => {
        let eyes = document.querySelectorAll('.eye');
        // console.log(eyes);
        eyes.forEach((e) => {
            if (e.classList.contains('active'))
                e.classList.remove('active');
            else e.classList.add('active');
        })
        setIsShowPassword(!isShowPassword);
    }
    const handleLogin = async () => {
        if (!email || !password) {
            toast.error("Email/Passwork is require");
            return;
        }
        setLoadingAPI(true);
        let res = await loginApi(email.trim(), password);
        // console.log(res);
        setLoadingAPI(false);
        if (res?.token) {
            loginContext(email.trim(), res.token);
            toast.success("Login success");
            navigate('/');
        } else if (res?.status >= 400) {
            toast.error("ERROR");
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleGoBack = () => {
        navigate('/');
    }
    const handlePressEnter = (e) => {
        if (e?.key + '' === 'Enter') {
            handleLogin();
        }
    }
    return (<>
        <div className="login-container col-12 col-sm-4">
            <div className="title">Login</div>
            <div className="title-email">Email or user name (eve.holt@reqres.in )</div>
            <input
                type='text'
                className='form-control'
                placeholder="Username or Email"
                value={email}
                onChange={(e) => { handleEmailChange(e) }} />
            <div className="password-input">
                <input
                    type={isShowPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onKeyDown={handlePressEnter}
                    onChange={(e) => setPasswork(e.target.value)}
                />

                <FaRegEye className="eye" onClick={(e) => handleeys(e)} />
                <FaRegEyeSlash className="eye active" onClick={(e) => handleeys(e)} />
            </div>

            <button
                type="submit"
                className={`${email && password ? 'btn-active' : ''}`}
                disabled={email && password && !loadingApi ? false : true}
                onClick={() => handleLogin()}>
                {loadingApi && <div className={"spinner-border spinner-border-sm"} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>}
                <span>  </span>
                Login
            </button>
            <div>Login with gg</div>
            <div className="back" onClick={handleGoBack}>Go back</div>
        </div>
    </>);
}

export default Login;