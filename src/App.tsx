import React from 'react';
import {Container} from "./components/Container";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {EmployeePage} from "./components/EmployeePage";
import {AddNewEmployeePage} from "./components/AddNewEmployeePage";
import {HelmetProvider} from 'react-helmet-async';


function App() {
    return (
        <HelmetProvider>
            <Router>
                <Container>
                    <SimpleNavbar/>
                    <Routes>
                        <Route path="/" element={<EmployeePage/>}/>
                        <Route path="/add" element={<AddNewEmployeePage/>}/>
                    </Routes>
                </Container>
            </Router>
        </HelmetProvider>
    );
}

export default App;
