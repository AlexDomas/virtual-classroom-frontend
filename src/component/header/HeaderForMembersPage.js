import React from 'react';
import StudentService from "../../service/StudentService";
import {useNavigate} from "react-router";
import '../../style/header.css';

const STATUS_OK = 200;

const HeaderForMembersPage = ({currentStudent}) => {

    const navigate = useNavigate();

    async function changeStateOfHand() {
        try {
            currentStudent.hand = currentStudent.hand === false
            let statusCode = await StudentService.raiseHand(currentStudent);
            if (statusCode === STATUS_OK) {
                if (currentStudent.hand !== true) {
                    document.getElementById("action").innerHTML = "Raise hand up"
                } else document.getElementById("action").innerHTML = "Hand down"
            } else currentStudent.hand = currentStudent.hand === false
        } catch (e) {
            console.log(e)
        }
    }

    async function handlerRiseHand(event) {
        event.preventDefault()
        await changeStateOfHand()
    }

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
        <header className="header">
            <nav className="nav">
                <ul className="nav__links">
                    <details className="dropdown">
                        <summary role="button">
                            <a className="button">Actions  &#9660;</a>
                        </summary>
                        <ul>
                            <li><a href="#" id="action" onClick={handlerRiseHand}>Raise hand up</a></li>
                        </ul>
                    </details>
                </ul>
                <ul className="nav__links">
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