import { useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import { EmployeeContext } from "context/employeeContext";
import { ACTIONS } from 'helpers';
import { changeDateFormat } from 'helpers';
import Employee from 'components/Employee/Employee';
import EditEmployee from 'components/EditEmployee/EditEmployee';
import './EmployeeData.scss';

const EmployeeData = (props) => {
  
  const context = useContext(EmployeeContext);
  /**
   * Reducer function to update edit state
   * @param {*object} state state value automatically provided by Reducer
   * @param {*object} action contains necessary properties action.type & action.payload to update the state 
   * @returns {object} new updated state if action.type value is expected else returns same state value
   */
  const setEditReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.set:
        /** setting editEmpData field values */
        editEmpDispatch({ type: ACTIONS.set, payload: { index: action.payload.index } });
        return {
          active: true,
          index: action.payload.index
        };
      case ACTIONS.reset:
        /** resetting editEmpData field values */
        Object.keys(editEmpData).forEach((key) => editEmpDispatch({ type: key, payload: { value: "" } }));
        return {
          active: false,
          index: null
        };
      default:
        return state;
    }
  }

  /**
   * Reducer function to update editEmpData state
   * @param {*object} state state value automatically provided by Reducer
   * @param {*object} action contains necessary properties action.type & action.payload to update the state 
   * @returns {object} new updated state if action.type value is expected else returns same state value
   */
  const editEmpReducer = (state, action) => {
    if(action.type === ACTIONS.set) {
      /** when edit button is clicked */
      /** storing copy in new variable to properly mutate state */ 
      let newState = JSON.parse(JSON.stringify(state));
      /** extracting values from context at provided index */
      Object.keys(context.empData.data[action.payload.index]).forEach(key => newState[key] = context.empData.data[action.payload.index][key]);
      /** overriting required fields */
      newState.dob = changeDateFormat(newState.dob, 'html');
      return newState;
    } else if (context.empFields.data.includes(action.type)) {
      /** on edit input change */
      /** overrite property it expected */
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

  /**
   * To set edited employee to context 
   * @returns true
   */
  const editEmpHandler = () => {
    /** storing copy in new variable to properly mutate state */
    let newState = JSON.parse(JSON.stringify(editEmpData));
    /** Overwriting required fields */
    newState.dob = changeDateFormat(newState.dob, 'api');
    /**  Adding edited Employee to context */
    context.empData.setData({ 
      type: ACTIONS.edit, 
      payload: { data: newState, index: edit.index } 
    });
    /** resetting edit state */
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
      { 
      /** after clicking edit button */
        edit.active && createPortal(
          <EditEmployee 
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