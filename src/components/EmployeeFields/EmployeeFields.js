import './EmployeeFields.scss';

const EmployeeFields = (props) => {
  return ( 
    <div className="emp-field-row row">
      { Object.values(props.fieldDetails).map(field => 
        <div key={field.id} className={`col emp-field-col col-${field.id}`}>{field.label}</div> 
      )}
    </div>
  );
}

export default EmployeeFields;
