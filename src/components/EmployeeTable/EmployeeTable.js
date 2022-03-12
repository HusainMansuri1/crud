import EmployeeFields from "components/EmployeeFields/EmployeeFields";
import EmployeeData from "components/EmployeeData/EmployeeData";
import './EmployeeTable.scss';

const EmployeeTable  = (props) => {
  return ( 
    <div className="empt-tbl">
      <EmployeeFields />
      <EmployeeData 
        fieldDetails={props.fieldDetails}
        blankEmpData={props.blankEmpData}
      />
    </div>
  );
}

export default EmployeeTable;