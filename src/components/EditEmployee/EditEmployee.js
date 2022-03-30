import EmployeeFieldGroup from "components/EmployeeFieldGroup/EmployeeFieldGroup";
import './EditEmployee.scss';

const Edit = (props) => {
  return(
    <div className='edit-emp'>
      <h2>Edit Employee</h2>
      <form className='edit-emp-form' onSubmit={props.submit}>
        { Object.values(props.fieldDetails).map((field) => 
          field.editable && 
            <EmployeeFieldGroup
              key={field.id} 
              id={field.id} 
              value={props.data[field.id]} 
              label={field.label} 
              type={field.type} 
              change={props.change} 
            />
        )}
        <button type='submit'>Edit Employee</button>
        <button 
          type='reset'
          onClick={props.reset}
        >
            Cancel
        </button>
      </form>
    </div>
  );
}

export default Edit;