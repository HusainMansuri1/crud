import react, { useContext } from 'react';
import { EmployeeContext } from 'context/employeeContext';
import './Header.scss';

const Header = (props) => {
  const context = useContext(EmployeeContext);
  
  return ( 
    <header className="app-header">
      <div className="container">
        No of Employee: {context.empData.data.length}
      </div>
    </header>
  );
}
 
export default Header;