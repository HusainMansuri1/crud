import Employee from 'components/Employee/Employee';
import './EmployeeData.scss';

const EmployeeData = (props) => {
  // console.log('props:', props.data)

  return ( 
    <div className="emp__data">
      {props.data.map(curEmp =>  
        <Employee key={curEmp.id} emp={curEmp}/> 
      )}
    </div>
  );
}

export default EmployeeData;