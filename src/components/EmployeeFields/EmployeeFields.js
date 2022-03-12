import { useContext } from 'react';
import { EmployeeContext } from 'context/employeeContext';
import './EmployeeFields.scss';

const EmployeeFields = (props) => {
  const context = useContext(EmployeeContext);

  return ( 
    <div className="emp-field-row row">
      {context.empFields.data.map(field => <div key={field} className={`col emp-field-col col-${field}`}>{field}</div>)}
    </div>
  );
}

export default EmployeeFields;