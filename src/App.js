import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import EmployeeMain from 'components/employeeMain/employeeMain';
// import Test from 'components/Test';
import { EmployeeContextProvider } from 'context/employeeContext';

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
