const EmployeeFieldGroup = (props) => {
  return ( 
    <div className={`add-emp__${props.id} add-emp__grp`}>
      <label 
        className="emp-label" 
        htmlFor={props.id}>
          {props.label}
        </label>
      <input 
        id={props.id} 
        value={props.value} 
        type={props.type}
        onChange={props.change} 
        className="emp-input"
        placeholder={`Please enter ${props.label} `}
        required />
    </div>
  );
}
 
export default EmployeeFieldGroup;