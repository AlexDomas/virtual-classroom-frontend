import React, {useEffect, useState} from 'react';
import StudentService from "../../service/StudentService";
import MembersTable from "../../component/table/MembersTable";
import HeaderForMembersPage from "../../component/header/HeaderForMembersPage";
import {useNavigate} from "react-router";
import {Stomp} from "@stomp/stompjs";
import SockJS from 'sockjs-client'
import {WS_CROSS_ORIGIN} from "../../service/RemoteService"

const TOPIC_SUB_CREATE = '/topic/members/create';
const TOPIC_SUB_DELETE = '/topic/members/delete';
const TOPIC_SUB_UPDATE = '/topic/members/update';

const MembersPage = ({currentStudent, setMessage}) => {
    const navigate = useNavigate();

    let stompClient = React.useRef(null);

    const [connect, setConnect] = useState(false);

    const [students, setStudents] = useState([])

    useEffect(() => {
        if (connect === true) {
            return;
        }
        connection();
    }, [])

    async function loadStudents() {
        let listOfStudents = await StudentService.getAll();
        setStudents(listOfStudents);
    }

    function connection() {
        stompClient.current = Stomp.over(function () {
            return new SockJS(WS_CROSS_ORIGIN)
        });
        stompClient.current.connect({}, onConnected);
    }

    const onConnected = async () => {
        stompClient.current.subscribe(TOPIC_SUB_CREATE, onCreatedStudent);
        stompClient.current.subscribe(TOPIC_SUB_DELETE, onDeletedStudent);
        stompClient.current.subscribe(TOPIC_SUB_UPDATE, onUpdatedStudent);
        setConnect(true);
        loadStudents();
    }

    const onCreatedStudent = (payload) => {
        let student = JSON.parse(payload.body);
        setStudents(previousState => [...previousState, student])
    }

    const onDeletedStudent = (payload) => {
        let uuid = JSON.parse(payload.body);
        setStudents(previousState => {
            return previousState.filter(student => student.id !== uuid)
        })
    }

    const onUpdatedStudent = (payload) => {
        let studentUpdate = JSON.parse(payload.body);
        setStudents(previousState => {
            let studentExist = previousState.find(student => student.id === studentUpdate.id)
            if (studentExist !== undefined) {
                studentExist.name = studentUpdate.name;
                studentExist.hand = studentUpdate.hand;
            }
            return [...previousState]
        });
    }

    async function handlerLogout(event) {
        if (event !== null) event.preventDefault()
        try {
            await StudentService.removeById(currentStudent.id)
            disconnect()
            navigate('/login');
        } catch (ex) {
            console.log(ex)
        }
    }

    function disconnect() {
        if (stompClient.current !== null) {
            stompClient.current.disconnect();
        }
    }

    if (currentStudent.name === "") {
        navigate('/login');
    } else {
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
