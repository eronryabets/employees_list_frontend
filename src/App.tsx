import React from 'react';
import {Container} from "./components/Container";
import {SimpleNavbar} from "./components/SimpleNavbar";
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom';
import {EmployeePage} from "./components/EmployeePage";
import {AddNewEmployeePage} from "./components/AddNewEmployeePage";
import {HelmetProvider} from 'react-helmet-async';
import {NotFoundPage} from "./components/NotFoundPage";
import {LoginForm} from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {EditEmployeePage} from "./components/EditEmployeePage";


function App() {
    return (
        <HelmetProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm/>}/>
                    {/* Защищенные маршруты */}
                    <Route element={<ProtectedRoute/>}>

                        <Route element={<MainLayout/>}>
                            <Route path="/" element={<EmployeePage/>}/>
                            <Route path="/add" element={<AddNewEmployeePage/>}/>
                            <Route path="/employee/:id" element={<EditEmployeePage />} />
                        </Route>

                    </Route>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Router>
        </HelmetProvider>
    );
}

const MainLayout = () => (
    <Container>
        <SimpleNavbar/>
        <Outlet/>
    </Container>
);

export default App;
