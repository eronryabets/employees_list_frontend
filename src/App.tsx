import React from 'react';
import {Container} from "./components/Container";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EmployeePage} from "./components/EmployeePage";
import {AddNewEmployeePage} from "./components/AddNewEmployeePage";


function App() {
    return (
        <Router>
            <Container>
                <SimpleNavbar/>
                <Routes>
                    <Route path="/" element={<EmployeePage/>} />
                    <Route path="/add" element={<AddNewEmployeePage/>}/>
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
