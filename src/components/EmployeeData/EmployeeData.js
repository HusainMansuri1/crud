import { useState, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import { EmployeeContext } from "context/employeeContext";
import Employee from 'components/Employee/Employee';
import AddEmployeeFieldGroup from "components/AddEmployeeFieldGroup/AddEmployeeFieldGroup";
import { ACTIONS } from 'helpers';
import './EmployeeData.scss';

const EmployeeData = (props) => {
  
  const context = useContext(EmployeeContext);

  const [edit, setEdit] = useState({
    active: false,
    index: null
  });

  const editEmpReducer = (state, action) => {
    if(action.type === ACTIONS.set) {
      let newState = JSON.parse(JSON.stringify(state));
      Object.keys(context.empData.data[action.payload.index]).forEach(key => newState[key] = context.empData.data[action.payload.index][key]);
      return newState;
    } else if (context.empFields.data.includes(action.type)) {
      return ({
        ...state,
        [action.type]: action.payload.value
      })
    } else {
      return state;
    }
  };

  const [editEmpData, editEmpDispatch] = useReducer(editEmpReducer, props.blankEmpData);
  console.log('props.blankEmpData:', props.blankEmpData)

  const activateEditHandler = (index) => {
    setEdit({
      active: true,
      index
    });
    editEmpDispatch({ type: ACTIONS.set, payload: {index}})
  };

  const editEmpHandler = (e) => {
    let updatedEmp = JSON.parse(JSON.parse(editEmpData));
    context.empData.setData({ type: ACTIONS.edit, payload: { data: updatedEmp } });
    return true;  
  };

  const Edit = () => {
    return(
      <div className='edit-emp'>
        <h2>Edit Employee</h2>
        <form className='add-emp-form' onSubmit={() => context.empData.setData({ 
          type: ACTIONS.edit, 
          payload: { data: editEmpData, index: edit.index } 
        })}>
          { Object.values(props.fieldDetails).map((field) => 
            field.id !== "id" && 
              <AddEmployeeFieldGroup 
                key={field.id} 
                id={field.id} 
                value={editEmpData[field.id]} 
                label={field.label} 
                type={field.type} 
                change={(e) => editEmpDispatch({ 
                  type: e.target.id, 
                  payload: { value: e.target.value } 
                })} 
              />
          )}
          <button type='submit'>Edit Employee</button>
        </form>
      </div>
    );
  }

  return ( 
    <div className="emp__data">
      {context.empData.data.map((curEmp, ind) =>  
        <Employee 
          key={curEmp.id} 
          index={ind}
          emp={curEmp}
          change={context.empData.setData}
          edit={() => activateEditHandler(ind)}
        /> 
      )}
      { edit.active && createPortal(
        <Edit />,
        document.getElementById('edit-root')
      ) }
    </div>
  );
}

export default EmployeeData;