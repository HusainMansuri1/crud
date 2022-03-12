import EmployeeTable from "components/EmployeeTable/EmployeeTable";
import AddEmployee from "components/AddEmployee/AddEmployee";
import './employeeMain.scss';

const EmployeeMain = () => {
  return ( 
    <main className="app-main">
      <div className="container">
        <EmployeeTable />
        <AddEmployee />
      </div>
    </main>
  );
}

export default EmployeeMain;