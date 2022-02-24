import './EmployeeFields.scss';

const EmployeeFields = (props) => {
  return ( 
    <div className="emp-field-row row">
      {props.data.map(field => <div key={field} className={`col emp-field-col col-${field}`}>{field}</div>)}
    </div>
  );
}

export default EmployeeFields;