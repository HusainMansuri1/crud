import { useContext, useReducer} from "react";
import { EmployeeContext } from "context/employeeContext";
import AddEmployeeFieldGroup from "components/AddEmployeeFieldGroup/AddEmployeeFieldGroup";
import { ACTIONS } from "helpers";
import { generateUniqueId } from "helpers";
import { changeDateFormat } from "helpers";
import "./AddEmployee.scss";

const AddEmployee = (props) => {
  const context = useContext(EmployeeContext);

  /**
   * Reducer function to update newEmpData state
   * @param {*object} state state value automatically provided by Reducer
   * @param {*object} action contains necessary properties action.type & action.payload to update the state 
   * @returns {object} state: new updated state if action.type value is expected else returns same state value
   */
  const newEmpReducer = (state, action) => {
    if (context.empFields.data.includes(action.type)) {
      return ({
        ...state,
        [action.type]: action.payload.value
      })
    } else {
      return state;
    }
  };

  const [newEmpData, newEmpDispatch] = useReducer(newEmpReducer, props.blankEmpData);
 
  const addEmpHandler = (e) => {
    e.preventDefault();
    let newEmp = JSON.parse(JSON.stringify(newEmpData));
    /** Overwriting required employee fields */
    newEmp.id = generateUniqueId(context.empData.data.map(cur => cur.id));
    newEmp.dob = changeDateFormat(newEmpData.dob);
    /**  Adding new Employee*/
    context.empData.setData({ type: ACTIONS.add, payload: { data: newEmp } });
    /** Emptying employ state field values */
    Object.keys(newEmpData).forEach((key) => newEmpDispatch({ type: key, payload: { value: "" } }));
    return true;
  };

  return (
    <div className='add-emp'>
      <h2>Add Employee</h2>
      <form className='add-emp-form' onSubmit={addEmpHandler}>
        { Object.values(props.fieldDetails).map((field) => 
          field.id !== "id" && 
            <AddEmployeeFieldGroup 
              key={field.id} 
              id={field.id} 
              value={newEmpData[field.id]} 
              label={field.label} 
              type={field.type} 
              change={(e) => newEmpDispatch({ 
                type: e.target.id, 
                payload: { value: e.target.value } 
              })} 
            />
        )}
        <button type='submit'>Add New Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
