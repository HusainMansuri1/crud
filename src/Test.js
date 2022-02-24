
import React from 'react';
import { EmployeeContext } from 'context/employeeContext';

const Test = (props) => {
  const [employeeData, employeeDataDispatch] = React.useContext(EmployeeContext);

  return ( 
    <main>
      {
        employeeData && employeeData.map(cur => <p key={cur.id}>{cur.firstName}</p>)
      }
    </main>
  );
}

export default Test;