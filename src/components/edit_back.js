import { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { ACTIONS, changeDateFormat } from "helpers";

const EditEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, id, editEmp 
}) => {
  
  /**
   * To store Edit operation  State
   */
  const [editEmpData, setEditEmpData] = useState(null);

  /**
   * To store original backup of Edit operation  State
   */
  const [editEmpDataBackup, setEditEmpDataBackup] = useState(null);

  useEffect(() => {
    setEditEmpData(editEmp);
    setEditEmpDataBackup(JSON.parse(JSON.stringify(editEmp)));
  }, [editEmp]);
  
  /**
   * To store Date edit status 
   */
  const [dateEdited, setDateEdited] = useState(false);

  /**
   * To Edit employee to empData(App.js) State and related operations
   */
  const editEmpOperation = () => {
    if(dateEdited) {
      /** if date is edited then change date format before updating state */
      let editEmpCopy = JSON.parse(JSON.stringify(editEmpData));
      editEmpCopy.dob = changeDateFormat(editEmpCopy.dob, 'api');
      /** saving edited employee to [App.js] State */
      onOk({ type: ACTIONS.edit, payload: { id, data: editEmpCopy } })
    } else {
      /** saving edited employee to [App.js] State */
      onOk({ type: ACTIONS.edit, payload: { id, data: editEmpData }})
    }
    /**  disabling Edit toggle [App.js] State */
    onCancel({
      active: false,
      id: null
    })
  };

  /**
   * To get current field value from editEmpData state 
   * @param {*string} field field name:dataIndex
   * @returns {string} formatted if current field is dob
   */
  const getFieldValue = (field) => {
    if(editEmpData){
      if(field.dataIndex === 'dob') {
        return changeDateFormat(editEmpData[field.dataIndex], 'html')
      } else {
        return editEmpData[field.dataIndex]
      }
    }
  };

  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="Edit selected record"
      okText="Edit"
      cancelText="Cancel"
      onOk={() => {
        editEmpOperation();
        onCancel({
          active: false,
          id: null
        });
      }}
      onCancel={() => {
        onCancel({
          active: false,
          id: null
        });
        setEditEmpData(null)
      }}
    >
      {
        empFieldsDetail.map(field => {
          if(field.editable) {
            return(
              <div 
                key={field.key} 
                className={`input-block edit-input-block edit${field.dataIndex}-block`}
              >
                <label>{field.title}</label>
                <Input 
                  id={field.dataIndex}
                  value={getFieldValue(field)}
                  type={field.inputType}
                  placeholder={`Please Enter ${field.title}`}
                  onChange={(e) => {
                    e.target.id === 'dob' && setDateEdited(true)
                    setEditEmpData(pre => {
                      return {
                        ...pre,
                        [field.dataIndex]: e.target.value
                      }
                    })
                  }}
                />
              </div>
            );
          };
        })
      }
    </Modal>
  );
}

export default EditEmployeeModal;