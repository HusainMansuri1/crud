import './EmployeeFields.scss';

const EmployeeFields = (props) => {

  console.log(props.fieldDetails)

  const a = Object.values(props.fieldDetails).map(field => field.id);
  console.log(Object.values(props.fieldDetails).forEach(field => field.id))

  return ( 
    <div className="emp-field-row row">
      { Object.values(props.fieldDetails).map(field => 
        <div key={field.id} className={`col emp-field-col col-${field.id}`}>{field.label}</div> 
      )}
    </div>
  );
}

export default EmployeeFields;
