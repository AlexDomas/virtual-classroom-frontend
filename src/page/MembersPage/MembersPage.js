import React, {useEffect, useState} from 'react';
import StudentService from "../../service/StudentService";
import MembersTable from "../../component/table/MembersTable";
import HeaderForMembersPage from "../../component/header/HeaderForMembersPage";
import {useNavigate} from "react-router";

const MembersPage = ({currentStudent}) => {
    const navigate = useNavigate();

    const [students, setStudents] = useState([])

    async function loadStudents() {
        let listOfStudents = await StudentService.getAll();
        setStudents(listOfStudents);
    }

    loadStudents();

    const onCreatedStudent = (payload) => {
        let student = JSON.parse(payload.body);
        setStudents(prevState => [...prevState, student])
    }

    async function handlerLogout(e) {
        if (e !== null) e.preventDefault()

        try {
            await StudentService.removeById(currentStudent.id)
            navigate('/login');
        } catch (ex) {
            console.log(ex)
        }
    }

    if(currentStudent.name === ""){
        navigate('/login');
    }else
    {
        return (
            <div>
                <HeaderForMembersPage currentStudent={currentStudent}/>
                <main className="app">
                    <div className="members">
                        {students.map(student => <MembersTable item={student}/>)}
                    </div>
                </main>
            </div>);
    }
};

export default MembersPage;
