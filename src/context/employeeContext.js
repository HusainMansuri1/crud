import axios from 'axios';
import React, {useReducer, useEffect, createContext, useState} from 'react';

export const EmployeeContext = createContext([]);

export const ACTIONS = {
  set: '=',
  add: '+',
  delete: '-',
  edit: '~'
}

export const EmployeeContextProvider = props => {
  const empReducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.set: 
        return action.payload.data;

      case ACTIONS.add:
        return {
          ...state, 
          'data': [
            ...state.data, 
            action.payload.data
          ]
        };
        
      case ACTIONS.edit:
        return state;

      case ACTIONS.delete:
        return state;

      default:
        return state;
    } 
  };

  const [empData, empDispatch] = useReducer(empReducer, []);
  const [empFields, setEmpFields] = useState([]);
  const [loadInfo, setLoadInfo] = useState({
    loaded: false,
    success: false
  });

  useEffect(() => {
    axios
      .get(`https://hub.dummyapis.com/employee?noofRecords=2&idStarts=1001`)
      .then(employeeData => {
        const EditedEmployeeFields = employeeData.data.map(currentEmployeeData => {
          const {address, imageUrl, salary, age, ...currentEditedEmployeeFields} = currentEmployeeData;
          return currentEditedEmployeeFields;
        });
        employeeData.data = EditedEmployeeFields;
        console.log('employeeData:', employeeData);

        empDispatch({type: ACTIONS.set, payload: {data: employeeData}});
        setEmpFields(Object.keys(EditedEmployeeFields[0]));
        setLoadInfo({loaded: true, success: true});
      })
      .catch(error => {
        console.log('employeeData error:', error);
        empDispatch({type: ACTIONS.set, payload: {data: []}});
        setLoadInfo({loaded: true, success: false});
      });
  }, []);

  return (
    <EmployeeContext.Provider value={{
      empData: {
        data: empData.data, 
        setData: empDispatch
      }, 
      empFields: {
        data: empFields, 
        setData: setEmpFields
      }
    }}>
      {loadInfo.loaded && props.children}
    </EmployeeContext.Provider>
  );
}
