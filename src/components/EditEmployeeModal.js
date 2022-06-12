import { useState, useEffect } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { ACTIONS, changeDateFormat } from "helpers";

const EditEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, id, editEmp 
}) => {
  const [form] = Form.useForm();
  
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
   * To handle field value change
   */
  useEffect(() => {
    // console.log('editEmpData:', editEmpData)
    // const formatDate = () => {
    //   return {
    //     ...editEmpData,
    //     // 'dob': changeDateFormat(editEmpData.dob, 'html')
    //   };
    // };
    form.setFieldsValue(editEmpData);  
  }, [form, editEmpData]);

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

  const closeModal = () => {
    /** closing modal state[App.js] */
    onCancel({
      active: false,
      id: null
    });
    /** setting state to starter empty Data object */
    setEditEmpData(null)
  };

  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="Edit selected record"
      onCancel={closeModal}
      footer={[
        <Button 
          key="cancel" 
          type="secondary"
          onClick={closeModal}>
          Close
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={editEmpOperation}
        initialValues={editEmpData}
      >
        {
          empFieldsDetail.map(field => {
            return(
              <Form.Item
                key={field.dataIndex}
                label={field.title}
                name={field.dataIndex}
                rules={[
                  { 
                    required: true, 
                    message: `Please enter your ${field.title}` 
                  },
                ]}
              >
                <Input 
                  disabled={!field.editable}
                  key={field.dataIndex}
                  id={field.dataIndex}
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
              </Form.Item>
            );
          })
        }
        <Form.Item style={{ 
          marginTop: 30, 
          marginBottom: 0 
        }}>
          <Button 
            type="primary" 
            htmlType="submit"
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>  
          <Button 
            type="secondary"
            onClick={() => setEditEmpData(editEmpDataBackup)} 
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default EditEmployeeModal;
