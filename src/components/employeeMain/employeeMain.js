import { useContext } from 'react';
import { EmployeeContext } from "context/employeeContext";
import EmployeeTable from "components/EmployeeTable/EmployeeTable";
import AddEmployee from "components/AddEmployee/AddEmployee";
import './employeeMain.scss';

const EmployeeMain = (props) => {
  const context = useContext(EmployeeContext);

  const empFieldDetails = (() => {
    let fields = {};
    context.empFields.data.forEach((field) => 
      fields[field] = ((key = field) => {
        switch (key) {
          case "id":
            return {
              id: key,
              label: "id",
            };
            
          case "firstName":
            return {
              id: key,
              label: "First Name",
              type: "text",
            };

          case "lastName":
            return {
              id: key,
              label: "Last Name",
              type: "text",
            };

          case "email":
            return {
              id: key,
              label: "Email",
              type: "email",
            };

          case "contactNumber":
            return {
              id: key,
              label: "Contact Number",
              type: "tel",
            };

          case "dob":
            return {
              id: key,
              label: "D.O.B.",
              type: "date",
            };

          default:
            return {};
        }
      })());
    return fields;
  })();

  const initEmptyEmpData = (() => {
    let empObj = {};
    context.empFields.data.forEach(cur => empObj[cur] = '');
    return empObj;
  })();
  
  return ( 
    <main className="emp-main" id="emp-main">
      <div className="container">
        <EmployeeTable 
          fieldDetails={empFieldDetails}
          blankEmpData={initEmptyEmpData}
        />
        <AddEmployee 
          fieldDetails={empFieldDetails}
          blankEmpData={initEmptyEmpData}
        />
      </div>
    </main>
  );
}

export default EmployeeMain;