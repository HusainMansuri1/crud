import React, { useRef, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Input, notification } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Header from "components/Header";
import Footer from "components/Footer";
import LoadMore from "components/LoadMore";
import EditEmployeeModal from "components/EditEmployeeModal";
import DeleteEmployeeModal from "components/DeleteEmployeeModal";
import ViewEmployeeModal from "components/ViewEmployeeModal";
import AddEmployeeModal from "components/AddEmployeeModal";
import { ACTIONS, changeDateFormat } from "helpers";
import "antd/dist/antd.css";
import "./index.scss";

interface ReducerActions {
  type: string;
  payload: {
    data: EmpDetails[];
    id?: number | string;
  };
};

interface CUDOperation {
  active: boolean;
  id: null | string;
};

const App = () => {

  /** API call related vars & state */
  let apiIdStartsAt = 1001;
  const apiFirstLoadCount = 5;

  const [apiLoadMoreCount, setApiLoadMoreCount] = useState<number>(2);

  const [apiLoadedCount, setApiLoadedCount] = useState<number>(0);

  const [apiLoadMoreToggle, setApiLoadMoreToggle] = useState<boolean>(false);

  /**
   * Reducer function to update empData state
   * @param state state value automatically provided by Reducer
   * @param action contains necessary properties action.type & action.payload to update the state
   * @returns new updated state if action.type value is expected else returns same state value
   */
  const empReducer = (state: EmpDetails[], action: ReducerActions) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    switch (action.type) {
      case ACTIONS.set:
        return [...state, ...action.payload.data];

      case ACTIONS.add:
        return [...state, action.payload.data];

      case ACTIONS.edit:
        stateCopy.forEach((elem: EmpDetails, index: number) => {
          if (elem.id === action.payload.id) stateCopy[index] = action.payload.data;
        });
        return stateCopy;

      case ACTIONS.delete:
        stateCopy = stateCopy.filter((elem: EmpDetails) => action.payload.id !== elem.id);
        return stateCopy;

      default:
        return state;
    }
  };

  /**
   * To store API call status
   */
  const [loadInfo, setLoadInfo] = useState<{
    loading: boolean;
    success: null | boolean;
  }>({
    loading: true,
    success: null,
  });

  /**
   * To store table data from API
   */
  const [empData, empDispatch] = useReducer(empReducer, []);

  /**
   * To store antd columns & fields/inputs details
   */
  const [empFieldsDetail, setEmpFieldsDetail] = useState<null | Fields[]>(null);

  /**
   * To store Add operation related State
   */
  const [addEmpToggle, setAddEmpToggle] = useState<boolean>(false);

  /**
   * To store Edit operation related State
   */
  const [editEmpToggle, setEditEmpToggle] = useState<CUDOperation>({
    active: false,
    id: null,
  });

  /**
   * To store Edit operation related State
   */
  const [viewEmpToggle, setViewEmpToggle] = useState<CUDOperation>({
    active: false,
    id: null,
  });

  /**
   * To store Delete operation related State
   */
  const [deleteEmpToggle, setDeleteEmpToggle] = useState<CUDOperation>({
    active: false,
    id: null,
  });

  /**
   * To attach additional necessary properties to each field which will be used further by antD columns and inputs while adding/editing data
   * @param rawFields which is returned from the API result
   * @returns {void}
   */
  const generateEmpFieldsDetail = (rawFields: string[]): Fields[] => {
    let refinedFields: Fields[] = [];
    rawFields.forEach((rawField) => {
      switch (rawField) {
        case "id":
          refinedFields.push({
            title: "ID",
            dataIndex: rawField,
            key: rawField,
            inputType: "",
            editable: false,
          });
          return;

        case "firstName":
          refinedFields.push({
            title: "First Name",
            dataIndex: rawField,
            key: rawField,
            inputType: "text",
            editable: true,
          });
          return;

        case "lastName":
          refinedFields.push({
            title: "Last Name",
            dataIndex: rawField,
            key: rawField,
            inputType: "text",
            editable: true,
          });
          return;

        case "email":
          refinedFields.push({
            title: "Email",
            dataIndex: rawField,
            key: rawField,
            inputType: "email",
            editable: true,
          });
          return;

        case "contactNumber":
          refinedFields.push({
            title: "Contact Number",
            dataIndex: rawField,
            key: rawField,
            inputType: "tel",
            editable: true,
          });
          return;

        case "dob":
          refinedFields.push({
            title: "D.O.B.",
            dataIndex: rawField,
            key: rawField,
            inputType: "date",
            editable: true,
          });
          return;

        default:
          return;
      }
    });
    return refinedFields;
  };

  /**
   * To activate view on button click
   * @param emp data object that is to be viewed
   */
  const activateView = (emp: CUDOperation): void => {
    setViewEmpToggle({
      active: true,
      id: emp.id,
    });
  };

  /**
   * To activate edit on button click
   * @param emp data object that is to be edited
   */
  const activateEdit = (emp: CUDOperation): void => {
    setEditEmpToggle({
      active: true,
      id: emp.id,
    });
  };

  /**
   * To activate delete on button click
   * @param emp data object that is to be deleteed
   */
  const activateDelete = (emp: CUDOperation): void => {
    setDeleteEmpToggle({
      active: true,
      id: emp.id,
    });
  };

  /**
   * To add html class which will change bg-color of antd table row when any action button is clicked
   * @param id id of the current row
   * @returns html class to be added to antd table row if any action active current
   */
  const getRowClass = (id: string): string => {
    switch (id) {
      case deleteEmpToggle.id:
        return "delete-active-row";

      case editEmpToggle.id:
        return "edit-active-row";

      case viewEmpToggle.id:
        return "view-active-row";

      default:
        return "";
    }
  };

  /**
   * To get list of all already used id's
   * @returns Array of of existing ids
   */
  const getUsedIDList = (): string[] => empData.map((emp: { id: string }) => emp.id);

  /**
   * To get current active operational row/emp
   * @returns row/emp 
   */
  const getEmp = (type: "view" | "edit" | "delete") => {
    let emp: object | EmpDetails = {};
    switch (type) {
      case "view":
        empData.forEach((curEmp: EmpDetails) => {
          if (curEmp.id === viewEmpToggle.id) {
            emp = { ...curEmp };
          }
        });
        return emp!;
      case "edit":
        empData.forEach((curEmp: EmpDetails) => {
          if (curEmp.id === editEmpToggle.id) {
            emp = { ...curEmp };
          }
        });
        return emp!;
      case "delete":
        empData.forEach((curEmp: EmpDetails) => {
          if (curEmp.id === deleteEmpToggle.id) {
            emp = { ...curEmp };
          }
        });
        return emp;
      default:
        return emp;
    }
  };

  /** For First Load */
  useEffect(() => {
    setLoadInfo((prev) => ({ ...prev, loading: true }));
    axios
    .get(`https://hub.dummyapis.com/employee?noofRecords=${apiFirstLoadCount}&idStarts=${apiIdStartsAt}`)
    .then((employeeData) => {
      apiIdStartsAt += 4;
      setApiLoadedCount(apiFirstLoadCount);
      /** extracting required data from  api result */
      const EditedEmployeeData = employeeData.data.map((currentEmployeeData: any) => {
        const { address, imageUrl, salary, age, ...currentEditedEmployeeData } = currentEmployeeData;
        currentEditedEmployeeData.key = currentEditedEmployeeData.id;
        currentEditedEmployeeData.dob = changeDateFormat(currentEmployeeData.dob, "html");
        return currentEditedEmployeeData;
      });
      return EditedEmployeeData;
    })
    .then((editedData) => {
      /** updating state on success */
      empDispatch({ type: ACTIONS.set, payload: { data: editedData } });
      setEmpFieldsDetail(generateEmpFieldsDetail(Object.keys(editedData[0])));
      setLoadInfo({ loading: false, success: true });
    })
    .catch((error) => {
      console.error("employeeData error:", error);
      notification.error({
        duration: 10,
        message: "Oops, Something went wrong! " + error,
      });
      /** updating state on error */
      empDispatch({ type: ACTIONS.set, payload: { data: [] } });
      setLoadInfo({ loading: false, success: false });
    });
  }, []);
  
  /** For LoadMore (will not run on first render)*/
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    } else {
      setLoadInfo((prev) => ({ ...prev, loading: true }));
      axios
        .get(`https://hub.dummyapis.com/employee?noofRecords=${apiLoadMoreCount}&idStarts=${apiIdStartsAt+apiLoadedCount}`)
        .then((employeeData) => {
          /** extracting required data from  api result */
          const EditedEmployeeData = employeeData.data.map((currentEmployeeData: any) => {
            const { address, imageUrl, salary, age, ...currentEditedEmployeeData } = currentEmployeeData;
            currentEditedEmployeeData.key = currentEditedEmployeeData.id;
            currentEditedEmployeeData.dob = changeDateFormat(currentEmployeeData.dob, "html");
            return currentEditedEmployeeData;
          });
          return EditedEmployeeData;
        })
        .then(editedData => {
          /** updating state on success */
          empDispatch({ type: ACTIONS.set, payload: { data: editedData } });
          setApiLoadedCount(prevState => prevState + apiLoadMoreCount);
          setLoadInfo({ loading: false, success: true });
        })
        .catch((error) => {
          console.error("employeeData LoadMore error:", error);
          notification.error({
            duration: 10,
            message: "Oops, Something went wrong! " + error,
          });
        });
    }
  }, [apiLoadMoreToggle]);

  return (
    <div className='App'>
      <Header empCount={empData.length} />
      <div className='app-main'>
        <div className='container'>
          {(loadInfo.success && empData) && (
            <>
              <LoadMore 
                loadInfo={loadInfo}
                apiLoadMoreCount={apiLoadMoreCount}
                setApiLoadMoreToggle={setApiLoadMoreToggle}
                setApiLoadMoreCount={setApiLoadMoreCount}
              />
              <Button 
                disabled={!loadInfo.success || loadInfo.loading} 
                type='primary' 
                style={{ 
                  marginBottom: 20, 
                  background: "#41cfc2",
                  borderColor: "#41cfc2",
                  fontWeight: 500
                }}
                onClick={() => setAddEmpToggle(true)}
              >
                 Input New row
              </Button>
              <Table
                loading={loadInfo.loading}
                rowClassName={(record) => getRowClass(record.id)}
                columns={
                  empFieldsDetail! && [
                    ...(empFieldsDetail as any[]),
                    {
                      title: "Actions",
                      key: "actions",
                      render: (emp) => {
                        return (
                          <>
                            <Button className='action-btn action-btn__view' shape='circle' size='middle' icon={<EyeOutlined style={{ color: "#0031ff" }} />} style={{ margin: "0 5px" }} onClick={() => activateView(emp)} />

                            <Button className='action-btn action-btn__edit' shape='circle' size='middle' icon={<EditOutlined style={{ color: "#009688" }} />} style={{ margin: "0 5px" }} onClick={() => activateEdit(emp)} />

                            <Button className='action-btn action-btn__delete' shape='circle' size='middle' icon={<DeleteOutlined style={{ color: "#ff0000" }} />} style={{ margin: "0 5px" }} onClick={() => activateDelete(emp)} />
                          </>
                        );
                      },
                    },
                  ]
                }
                dataSource={empData}
              />
              { 
                (loadInfo.success && addEmpToggle) && 
                <AddEmployeeModal 
                  visible={addEmpToggle} 
                  empFieldsDetail={empFieldsDetail} 
                  usedIDList={getUsedIDList()} 
                  onCancel={setAddEmpToggle} 
                  onOk={empDispatch} 
                />
              }
              {
                (loadInfo.success && viewEmpToggle.id) && 
                <ViewEmployeeModal 
                  visible={viewEmpToggle.active} 
                  empFieldsDetail={empFieldsDetail} 
                  onCancel={setViewEmpToggle} 
                  viewEmp={getEmp("view")} 
                />
              }
              {
                (loadInfo.success && editEmpToggle.id) && 
                <EditEmployeeModal 
                  visible={editEmpToggle.active} 
                  id={editEmpToggle.id} 
                  empFieldsDetail={empFieldsDetail} 
                  onOk={empDispatch} 
                  onCancel={setEditEmpToggle} 
                  editEmp={getEmp("edit")} 
                />
              }
              {
                (loadInfo.success && deleteEmpToggle.id) && 
                <DeleteEmployeeModal 
                  visible={deleteEmpToggle.active} 
                  id={deleteEmpToggle.id} 
                  empFieldsDetail={empFieldsDetail} 
                  onOk={empDispatch} 
                  onCancel={setDeleteEmpToggle} 
                  deleteEmp={getEmp("delete")} 
                />
              }
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
