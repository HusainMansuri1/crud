import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, notification } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Header from 'components/Header';
import Footer from 'components/Footer';
import EditEmployeeModal from 'components/EditEmployeeModal';
import DeleteEmployeeModal from 'components/DeleteEmployeeModal';
import ViewEmployeeModal from 'components/ViewEmployeeModal';
import AddEmployeeModal from 'components/AddEmployeeModal';
import { ACTIONS, apiEndPoint, changeDateFormat } from "helpers";
import 'antd/dist/antd.css';
import './index.scss';

const App = () => {
  useEffect(() => {
    axios
      .get(apiEndPoint)
      .then(employeeData => {
        setLoadInfo(prev => ({ ...prev, loading: true }));
        /** extracting required data from  api result */
        const EditedEmployeeData = employeeData.data.map(currentEmployeeData => {
          const { address, imageUrl, salary, age, ...currentEditedEmployeeData } = currentEmployeeData;
          currentEditedEmployeeData.key = currentEditedEmployeeData.id;
          currentEditedEmployeeData.dob = changeDateFormat(currentEmployeeData.dob, 'html');
          return currentEditedEmployeeData;
        });
        return EditedEmployeeData;
      })
      .then(EditedData => {
        /** updating state on success */
        empDispatch({ type: ACTIONS.set, payload: { data: EditedData }});
        setEmpFieldsDetail(generateEmpFieldsDetail(Object.keys(EditedData[0])));
        setLoadInfo({ loading: false, success: true });
      })
      .catch(error => {
        console.log('employeeData error:', error);
        notification.error({
          duration: 10,
          message: "Oops, Something went wrong! " + error,
        });
        /** updating state on error */
        empDispatch({ type: ACTIONS.set, payload: { data: [] } });
        setLoadInfo({ loading: false, success: false });
      });
  }, []);

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
        stateCopy.forEach((elem, index) => {
          if (elem.id === action.payload.id) stateCopy[index] = action.payload.data;
        });
        return stateCopy;        

      case ACTIONS.delete:
        stateCopy = stateCopy.filter((element) => action.payload.id !== element.id);
        return stateCopy;  

      default:
        return state;
    } 
  };

  /**
   * To store API call status
   */
  const [loadInfo, setLoadInfo] = useState({
    loading: true,
    success: null
  });

  /**
   * To store table data from API
   */
  const [empData, empDispatch] = useReducer(empReducer, []);
  
  /**
   * To store antd columns & fields/inputs details
   */
  const [empFieldsDetail, setEmpFieldsDetail] = useState(null);

  /**
   * To store Add operation related State
   */
  const [addEmpToggle, setAddEmpToggle] = useState(false);
  
  /**
   * To store Edit operation related State
   */
  const [editEmpToggle, setEditEmpToggle] = useState({
    active: false,
    id: null
  });

  /**
   * To store Edit operation related State
   */
  const [viewEmpToggle, setViewEmpToggle] = useState({
    active: false,
    id: null
  });

  /**
   * To store Delete operation related State
   */
  const [deleteEmpToggle, setDeleteEmpToggle] = useState({
    active: false,
    id: null
  });
  
  /**
   * To attach necessary properties to each field which will be used further by antD columns and inputs while adding/editing data 
   * @param {*Array} rawFields which is returned from the API result
   * @returns {Array} refinedFields 
   */
  const generateEmpFieldsDetail = (rawFields) => {
    let refinedFields = [];
    rawFields.forEach((rawField) => {
      switch (rawField) {
        case "id":
          refinedFields.push({
            title: "ID",
            dataIndex: rawField,
            key: rawField,
            inputType: null,
            editable: false
          });
          return;
          
        case "firstName":
          refinedFields.push({
            title: "First Name",
            dataIndex: rawField,
            key: rawField,
            inputType: "text",
            editable: true
          });
          return;

        case "lastName":
          refinedFields.push({
            title: "Last Name",
            dataIndex: rawField,
            key: rawField,
            inputType: "text",
            editable: true
          });
          return;

        case "email":
          refinedFields.push({
            title: "Email",
            dataIndex: rawField,
            key: rawField,
            inputType: "email",
            editable: true
          });
          return;

        case "contactNumber":
          refinedFields.push({
            title: "Contact Number",
            dataIndex: rawField,
            key: rawField,
            inputType: "tel",
            editable: true
          });
          return;

        case "dob":
          refinedFields.push({
            title: "D.O.B.",
            dataIndex: rawField,
            key: rawField,
            inputType: "date",
            editable: true
          });
          return;

        default:
          return;
      }
    });
    return refinedFields;
  };

  /**
   * To activate view on view button click
   * @param {*Object} emp data object that is to be edited
   */
   const activateView = (emp) => {
    setViewEmpToggle({
      active: true,
      id: emp.id
    });
  };

  /**
   * To activate view on edit button click
   * @param {*Object} emp data object that is to be edited
   */
  const activateEdit = (emp) => {
    setEditEmpToggle({
      active: true,
      id: emp.id
    });
  };

  /**
   * To activate delete on delete button click
   * @param {*Object} emp data object that is to be deleted
   */
  const activateDelete = (emp) => {
    setDeleteEmpToggle({
      active: true,
      id: emp.id
    });
  };

  /**
   * To add html class to antd table row when edit or delete button is clicked
   * @param {*Number} id id of the current row
   * @returns {String} html class to be added to antd table row 
   */
  const rowBgColor = (id) => {
    switch(id) {
      case deleteEmpToggle.id:
        return 'delete-active-row';

      case editEmpToggle.id:
        return 'edit-active-row';

      case viewEmpToggle.id:
        return 'view-active-row';

      default:
        return
    }
  };

  /**
   * To get list of all currently used id's 
   * @returns {Array} of existing ids
   */
  const getUsedIDList = () => empData.map(emp => emp.id);
  
  /**
   * To get current active edit employee data object
   * @returns {Object} 
   */
  const getEmp = (type) => {
    let emp = null; 
    switch (type) {
      case 'view': 
        empData.forEach(curEmp => {
          if(curEmp.id === viewEmpToggle.id) { 
            emp = {...curEmp};
          };
        });
        return emp;
      case 'edit':
        empData.forEach(curEmp => {
          if(curEmp.id === editEmpToggle.id) { 
            emp = {...curEmp};
          };
        });
        return emp;
      case 'delete':
        empData.forEach(curEmp => {
          if(curEmp.id === deleteEmpToggle.id) { 
            emp = {...curEmp};
          };
        });
        return emp;
      default:
        return emp;
    }
    return emp;
  };

  return (
    <div className="App">
      <Header empCount={empData.length} />
        <div className="app-main">
          <div className="container">
            {
              (empData)
              &&
              <>
                <Button 
                  type="primary"
                  style={{ marginBottom: 20 }}  
                  onClick={() => setAddEmpToggle(true)}
                >
                  Add New
                </Button>
                <Table
                  loading={loadInfo.loading}
                  rowClassName={record => rowBgColor(record.id)}
                  columns={empFieldsDetail && [
                    ...empFieldsDetail, {
                      title: 'Actions',
                      key: 'actions',
                      render: (emp) => {
                        return(
                          <>
                            <Button
                              className="action-btn action-btn__view" 
                              shape="circle" 
                              size="middle" 
                              icon={<EyeOutlined style={{ color: '#0031ff' }} />}
                              style={{ margin: '0 5px' }}  
                              onClick={() => activateView(emp)}
                            />

                            <Button
                              className="action-btn action-btn__edit" 
                              shape="circle" 
                              size="middle" 
                              icon={ <EditOutlined style={{ color: '#009688' }} />}
                              style={{ margin: '0 5px' }}  
                              onClick={() => activateEdit(emp)}
                            />

                            <Button
                              className="action-btn action-btn__delete" 
                              shape="circle" 
                              size="middle" 
                              icon={ <DeleteOutlined style={{ color: '#ff0000' }} />}
                              style={{ margin: '0 5px' }}  
                              onClick={() => activateDelete(emp)}
                            />
                          </>
                        )
                      }
                    }
                  ]}
                  dataSource={empData}
                />
                <AddEmployeeModal 
                  loadSuccess={loadInfo.success}
                  visible={addEmpToggle}
                  empFieldsDetail={empFieldsDetail}
                  usedIDList={getUsedIDList()} 
                  onCancel={setAddEmpToggle}
                  onOk={empDispatch}
                />
                <ViewEmployeeModal 
                  loadSuccess={loadInfo.success}
                  visible={viewEmpToggle.active}
                  id={viewEmpToggle.id}
                  empFieldsDetail={empFieldsDetail && empFieldsDetail}
                  onCancel={setViewEmpToggle}
                  viewEmp={getEmp('view')}
                />
                <EditEmployeeModal 
                  loadSuccess={loadInfo.success}
                  visible={editEmpToggle.active}
                  id={editEmpToggle.id}
                  empFieldsDetail={empFieldsDetail && empFieldsDetail}
                  onOk={empDispatch}
                  onCancel={setEditEmpToggle}
                  editEmp={getEmp('edit')}
                />
                <DeleteEmployeeModal 
                  loadSuccess={loadInfo.success}
                  visible={deleteEmpToggle.active}
                  id={deleteEmpToggle.id}
                  empFieldsDetail={empFieldsDetail && empFieldsDetail}
                  onOk={empDispatch}
                  onCancel={setDeleteEmpToggle}
                  deleteEmp={getEmp('delete')}
                />
              </>
            }
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default App;
