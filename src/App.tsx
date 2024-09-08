import React from 'react';
import {Container} from "./components/Container";
import {TheHeader} from "./components/TheHeader";
import {EmployeeCard} from "./components/EmployeeCard";
import {defaultEmployee} from "./mock/employee";

function App() {
  return (
    <Container>
      <TheHeader/>
        <EmployeeCard {...defaultEmployee }/>
    </Container>
  );
}

export default App;
