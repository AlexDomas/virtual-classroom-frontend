import React from 'react';
import StudentService from "../../service/StudentService";
import {useNavigate} from "react-router";
import '../../style/header.css';

const HeaderForMembersPage = ({currentStudent}) => {

    const navigate = useNavigate();

    async function handlerLogout(event) {
        if (event !== null) event.preventDefault()

        try {
            await StudentService.deleteById(currentStudent.id)
            navigate('/login');
        } catch (ex) {
            console.log(ex)
        }
    }
    
    return (
        <header class="header">
            <nav class="nav">
                <img
                    src="logo/logo.png"
                    alt="Banking System logo"
                    class="nav__logo"
                    id="logo"
                />
                <ul class="nav__links">
                    <details className="dropdown">
                        <summary role="button">
                            <a className="button">{currentStudent.name}  &#9660;</a>
                        </summary>
                        <ul>
                            <li><a href="#" onClick={handlerLogout}>Logout</a></li>
                        </ul>
                    </details>
                </ul>
            </nav>
        </header>
    );
};

export default HeaderForMembersPage;