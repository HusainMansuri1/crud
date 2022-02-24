import './Employee.scss';

const Employee = (props) => {
  return ( 
    <div key={props.emp.id} className="emp-data-row row">
        {Object.keys(props.emp).map(empKey => (
          <div key={empKey} className={`col emp-data-col`}>{props.emp[empKey]}</div>
        ))}
    </div>
  );
}

export default Employee;