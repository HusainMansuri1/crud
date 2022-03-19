import { useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import { EmployeeContext } from "context/employeeContext";
import { ACTIONS } from 'helpers';
import { changeDateFormat } from 'helpers';
import Employee from 'components/Employee/Employee';
import Edit from 'components/Edit/Edit';
import './EmployeeData.scss';

const EmployeeData = (props) => {
  
  const context = useContext(EmployeeContext);
  
  const setEditReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.set:
        editEmpDispatch({ type: ACTIONS.set, payload: { index: action.payload.index } });
        return {
          active: true,
          index: action.payload.index
        };
      case ACTIONS.reset:
        Object.keys(editEmpData).forEach((key) => editEmpDispatch({ type: key, payload: { value: "" } }));
        return {
          active: false,
          index: null
        };
      default:
        return state;
    }
  }

  const editEmpReducer = (state, action) => {
    if(action.type === ACTIONS.set) {
      let newState = JSON.parse(JSON.stringify(state));
      Object.keys(context.empData.data[action.payload.index]).forEach(key => newState[key] = context.empData.data[action.payload.index][key]);
      newState.dob = changeDateFormat(newState.dob, 'html');
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

  const [edit, setEditDispatch] = useReducer(setEditReducer, {
    active: false,
    index: null
  });

  const editEmpHandler = () => {
    let newState = JSON.parse(JSON.stringify(editEmpData));
    newState.dob = changeDateFormat(newState.dob, 'api');
    context.empData.setData({ 
      type: ACTIONS.edit, 
      payload: { data: newState, index: edit.index } 
    });

    setEditDispatch( { type: ACTIONS.reset, payload: {} } )

    return true;  
  };

  return ( 
    <div className="emp__data">
      {context.empData.data.map((curEmp, index) =>  
        <Employee 
          key={curEmp.id} 
          index={index}
          emp={curEmp}
          edit={() => setEditDispatch( { type: ACTIONS.set, payload: { index } } )}
          delete = {() => {
            setEditDispatch( {type: ACTIONS.reset, payload: {} })
            return context.empData.setData({ type: ACTIONS.delete, payload: { index } })
          }}
        /> 
      )}
      { edit.active && createPortal(
          <Edit 
            fieldDetails={props.fieldDetails}
            data={editEmpData}
            submit={editEmpHandler}
            reset={() => setEditDispatch({ type: ACTIONS.reset, payload: {} } )}
            change={(e) => editEmpDispatch({ 
              type: e.target.id, 
              payload: { value: e.target.value } 
            })} 
          />,
        document.getElementById('edit-root')) 
      }
    </div>
  );
}

export default EmployeeData;