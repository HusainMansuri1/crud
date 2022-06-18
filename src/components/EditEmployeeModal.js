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
    setEditEmpDataBackup(editEmp);
  }, [editEmp]);
  
  /**
   * To store Date edit status 
   */
  const [dateEdited, setDateEdited] = useState(false);

  /**
   * To Edit employee to empData(App.js) State and related operations
   */
  const editEmpOperation = () => {
    /** saving edited employee to [App.js] State */
    onOk({ type: ACTIONS.edit, payload: { id, data: editEmpData }})
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
    form.setFieldsValue(editEmpData);  
  }, [form, editEmpData]);

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
                    required: field.editable, 
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
