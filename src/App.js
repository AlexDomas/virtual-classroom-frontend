import React, {useState} from 'react';
import {Route, BrowserRouter} from "react-router-dom";
import {Navigate, Routes} from "react-router";
import LoginPage from "./page/LoginPage/LoginPage";
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
            <Route path="/" element={<Navigate to={'/login'}/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
