import axios from 'axios';
import React, {useReducer, useEffect, createContext, useState} from 'react';
import { ACTIONS } from "helpers";
import { act } from '@testing-library/react';

export const EmployeeContext = createContext([]);

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
        let updatedEmpData = JSON.parse(JSON.stringify(state.data));
        updatedEmpData[action.payload.index] = action.payload.data;

        return {
          ...state, 
          'data': updatedEmpData
        };        

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
      }
    }}>
      {loadInfo.loaded && props.children}
    </EmployeeContext.Provider>
  );
}
