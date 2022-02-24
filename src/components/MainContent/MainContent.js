import EmployeeTable from "components/EmployeeTable/EmployeeTable";
import AddEmployee from "components/AddEmployee/AddEmployee";
import './MainContent.scss';

const Main = () => {
  return ( 
    <main className="app-main">
      <div className="container">
        <EmployeeTable />
        <AddEmployee />
      </div>
    </main>
  );
}

export default Main;