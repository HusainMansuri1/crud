import react, { useContext } from 'react';
import { EmployeeContext } from 'context/employeeContext';
import EmployeeFields from "components/EmployeeFields/EmployeeFields";
import EmployeeData from "components/EmployeeData/EmployeeData";
import './EmployeeTable.scss';

const EmployeeTable  = (props) => {
  const context = useContext(EmployeeContext);

  return ( 
    <div className="empt-tbl">
      <EmployeeFields data={context.empFields.data} setData={context.empFields.setData}/>
      <EmployeeData data={context.empData.data} setData={context.empData.setData}/>
    </div>
  );
}

export default EmployeeTable;