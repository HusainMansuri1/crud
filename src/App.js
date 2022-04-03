import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import EmployeeMain from 'components/EmployeeMain/EmployeeMain';
import { EmployeeContextProvider } from 'context/employeeContext';
import './App.css';

function App() {
  return (
    <EmployeeContextProvider>
      <div className="App">
        <Header />
        <EmployeeMain />
        <Footer />
      </div>
    </EmployeeContextProvider>
  );
}

export default App;
