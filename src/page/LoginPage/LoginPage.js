import React, {useState} from 'react';
import {useNavigate} from "react-router";
import StudentService from "../../service/StudentService";
import ErrorSpanElement from "../../component/error/ErrorSpanElement"
import '../../style/login.css';

const [BAD_REQUEST, INTERNAL_SERVER_ERROR] = [400, 500]

const LoginPage = ({setStudent}) => {

    const [loginData, setLoginData] = useState({
        id: "",
        name: "",
    });

    const navigate = useNavigate();

    const [error, setError] = useState({
        internalServerError: "",
        name: ""
    })

    const handleSubmit = async function (e) {
        e.preventDefault();

        try {
            const response = await StudentService.createStudent({
                name: loginData.name
            })
            
            setError({
                internalServerError: "",
                name: ""
            })

            setStudent({
                id: response.data.id,
                name: loginData.name,
                hand: false
            })
            navigate("/members")
        } catch (e) {
            let response = e.response;

            if (response.status === BAD_REQUEST) {
                if (response.data.name !== undefined) {
                    setError({
                        name: response.data.name,
                        internalServerError: ""
                    })
                }
            } else {
                if (response.status === INTERNAL_SERVER_ERROR) {
                    if (response.data.internalServerError !== undefined) {
                        setError({
                            name: "",
                            internalServerError: response.data.internalServerError
                        })
                    }
                }
            }
        }
    }

    return (
        <div className="container">
            <div className="screen">
                <div className="screen__content">
                    <form className="login">
                        <div className="login__field">
                            <i className="login__icon fas fa-user"></i>
                            <input type="text" className="login__input" placeholder="Student Name"
                                   value={loginData.name}
                                   onChange={event => setLoginData({...loginData, name: event.target.value})}/>
                            <ErrorSpanElement errorMessage={error}/>
                        </div>

                        <button className="button login__submit" onClick={handleSubmit}>
                            <span className="button__text">Login</span>
                            <i className="button__icon fas fa-chevron-right"></i>
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;