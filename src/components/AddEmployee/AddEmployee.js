import './AddEmployee.scss';
import react, { useContext, useReducer, useEffect, useState } from 'react';
import { EmployeeContext } from 'context/employeeContext';
import AddEmployeeFieldGroup from 'components/AddEmployeeFieldGroup/AddEmployeeFieldGroup';
import { ACTIONS } from 'context/employeeContext';

const AddEmployee = (props) => {
  const context = useContext(EmployeeContext);

  const setUpEmpObjDetails = (key) => {
    switch(key) {
      case 'id':
        return {
          id: key,
          value: '',
        };

      case 'firstName':  
        return {
          id: key,
          value: 'husain',
          label: 'First Name',
          type: 'text',
        }

      case 'lastName':  
        return {
          id: key,
          value: '',
          label: 'Last Name',
          type: 'text',
        }

      case 'email':  
        return {
          id: key,
          value: '',
          label: 'Email',
          type: 'email',
        }

      case 'contactNumber':  
        return {
          id: key,
          value: '',
          label: 'Contact Number',
          type: 'tel',
        }

      case 'dob':  
        return {
          id: key,
          value: '',
          label: 'D.O.B.',
          type: 'date',
        }

      default:
        return {};
    }
  };
  
  const setUpAddEmpObj = (argObj) => {
    context.empFields.data.forEach(field => argObj[field] = setUpEmpObjDetails(field));
    return argObj;
  }

  const addEmpReducer = (state, action) => {
    if(context.empFields.data.includes(action.type)) {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[action.type].value = action.payload.fieldValue;
      return stateCopy;
    }
  };

  const [addEmpData, addEmpDispatch] = useReducer(addEmpReducer, {} , setUpAddEmpObj); 

  const addEmpHandler = (e) => {
    const generateUniqueId = () => {
      console.log('entry');
      let uniqueId = Math.floor(Math.random() * (9999 - 1001) + 1001);
      console.log('id:', uniqueId);
      let existingIds = context.empData.data.map(cur => cur.id);

      if(existingIds.includes(uniqueId)) {
        console.log('duplicate');
        generateUniqueId();
      } else {
        console.log('og return', uniqueId);
        return uniqueId;
      }
    };

    e.preventDefault();
    let newEmp = {};
    Object.values(addEmpData).forEach((cur) => {
      newEmp[cur.id] = cur.value; 
    });

    newEmp.id = generateUniqueId();
    // newEmp.id = Math.floor(Math.random() * (1005 - 1010) + 1010);
    context.empData.setData({type: ACTIONS.add, payload: {data: newEmp}})
  };

  const addEmpDataHandler = (e) => {
    const {id, value} = e.target;
    addEmpDispatch({type: id, payload: {fieldValue: value}});
  };

  return ( 
    <div className="add-emp">
      <form className="add-emp-form" onSubmit={addEmpHandler}>
        {
          Object.values(addEmpData).map(curEmpData => 
            (curEmpData.id === 'firstName') && 
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
