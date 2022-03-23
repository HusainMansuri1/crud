import axios from 'axios';
import React, {useReducer, useEffect, createContext, useState} from 'react';
import { ACTIONS } from "helpers";

export const EmployeeContext = createContext([]);

export const EmployeeContextProvider = props => {
  /**
   * Reducer function to update empData state
   * @param {*object} state state value automatically provided by Reducer
   * @param {*object} action contains necessary properties action.type & action.payload to update the state 
   * @returns {object} new updated state if action.type value is expected else returns same state value
   */
  const empReducer = (state, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch(action.type) {
      case ACTIONS.set: 
        return action.payload.data;

      case ACTIONS.add:
        return  [
          ...state, 
          action.payload.data
        ];
        
      case ACTIONS.edit:
        stateCopy[action.payload.index] = action.payload.data;
        return stateCopy;        

      case ACTIONS.delete:
        stateCopy = stateCopy.filter((element, index) => action.payload.index !== index);
        return stateCopy;  

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
      .get(`https://hub.dummyapis.com/employee?noofRecords=1&idStarts=1001`)
      .then(employeeData => {
        /** extracting required data from  api result */
        const EditedEmployeeData = employeeData.data.map(currentEmployeeData => {
          const { address, imageUrl, salary, age, ...currentEditedEmployeeData } = currentEmployeeData;
          return currentEditedEmployeeData;
        });
        /** updating state on success */
        empDispatch({ type: ACTIONS.set, payload: { data: EditedEmployeeData } });
        setEmpFields(Object.keys(EditedEmployeeData[0]));
        setLoadInfo({ loaded: true, success: true });
      })
      .catch(error => {
        /** updating state on error */
        console.log('employeeData error:', error);
        empDispatch({type: ACTIONS.set, payload: {data: []}});
        setLoadInfo({loaded: true, success: false});
      });
  }, []);

  return (
    <EmployeeContext.Provider value={{
      empData: {
        data: empData, 
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
