import React, {useState} from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import LoginPage from "./page/LoginPage/LoginPage";
import MembersPage from "./page/MembersPage/MembersPage";
import ErrorPage from "./page/ErrorPage/ErrorPage";
import './App.css';

function App() {

  const [currentStudent, setCurrentStudent] = useState({
    id: 0,
    name: "",
    isHand: false
  })

  function setStudent(student) {
    setCurrentStudent(student)
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage setStudent={setStudent}/>}/>
            <Route path={"/members"} element={<MembersPage currentStudent={currentStudent}/>}/>
            <Route path="/" element={<Navigate to={'/login'}/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
