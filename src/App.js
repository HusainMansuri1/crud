import React from 'react';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import MainContent from 'components/MainContent/MainContent';
// import Test from 'components/Test';
import { EmployeeContextProvider } from 'context/employeeContext';

function App() {
  return (
    <EmployeeContextProvider>
      <div className="App">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </EmployeeContextProvider>
  );
}

export default App;
