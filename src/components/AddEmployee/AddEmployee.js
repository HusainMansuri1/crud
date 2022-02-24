import './AddEmployee.scss';
import react, { useContext, useReducer } from 'react';
import { EmployeeContext } from 'context/employeeContext';
import AddEmployeeFieldGroup from 'components/AddEmployeeFieldGroup/AddEmployeeFieldGroup';
import { ACTIONS } from 'context/employeeContext';

const AddEmployee = (props) => {
  const context = useContext(EmployeeContext);

  const setUpEmpObjDetails = (obj) => {
    switch(obj.id) {
      case 'id':  
        return {
          ...obj,
          value: context.empData.data[context.empData.data.length-1].id + 1
        };

      case 'firstName':  
        return {
          ...obj,
          label: 'First Name',
          type: 'text',
        }

      case 'lastName':  
        return {
          ...obj,
          label: 'Last Name',
          type: 'text',
        }

      case 'email':  
        return {
          ...obj,
          label: 'Email',
          type: 'email',
        }

      case 'contactNumber':  
        return {
          ...obj,
          label: 'Contact Number',
          type: 'tel',
        }

      case 'dob':  
        return {
          ...obj,
          label: 'D.O.B.',
          type: 'data',
        }

      default:
        return obj;
    }
  };

  const setUpAddEmpObj = (argArr) => {
    argArr = context.empFields.data.map(field => {
      let curObj = {
        id: field,
        value: ''
      };
      return setUpEmpObjDetails(curObj);
    });
    console.log('argArr:', argArr)
    return argArr;
  }

  const addEmpReducer = (state, action) => {
    switch(action.type) {
      case 'firstName': 
        return {
          ...state,
          firstName: action.payload.fieldValue,
        }

      case 'lastName' : 
        return {
          ...state,
          lastName: action.payload.fieldValue,
        }

      case 'email' : 
        return {
          ...state,
          email: action.payload.fieldValue,
        }

      case 'contactNumber' : 
        return {
          ...state,
          contactNumber: action.payload.fieldValue,
        }

      case 'dob' : 
        return {
          ...state,
          dob: action.payload.fieldValue,
        }

      default: 
        return state;
    }
  };

  const [addEmpData, addEmpDispatch] = useReducer(addEmpReducer, [] , setUpAddEmpObj); 

  const addEmpHandler = (e) => {
    e.preventDefault();
    context.empData.setData({type: ACTIONS.add, payload: {data: addEmpData}});
  };

  const addEmpDataHandler = (e) => {
    const {id, value} = e.target;
    addEmpDispatch({type: id, payload: {fieldValue: value}});
  }

  return ( 
    <div className="add-emp">
      <form className="add-emp-form" onSubmit={addEmpHandler}>
        {
          addEmpData.map(curEmpData => 
            curEmpData.id !== 'id' && 
            <AddEmployeeFieldGroup
              key={curEmpData.id} 
              id={curEmpData.id} 
              value={curEmpData.value} 
              label={curEmpData.label} 
              type={curEmpData.type} 
              change={addEmpDataHandler}
            />  
          )
        }
        <button type="submit">Add New Employee</button>
      </form>
    </div>
  );
}

export default AddEmployee;
