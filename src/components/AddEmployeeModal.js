import { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ACTIONS, generateUniqueId } from "helpers";

const AddEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, usedIDList 
}) => {
  const [form] = Form.useForm();

  /**
   * To generate starter Data object with all editable fields as keys and empty values
   * @returns {object} 
   */
  const getEmptyEmpData = () => {
    let emptyEmpData = {};
    empFieldsDetail.map(field => {
      if(field.editable) {
        return emptyEmpData[field.dataIndex] = '';
      }
    });
    return emptyEmpData;
  };

  /**
   * To store Add operation State
   */
    const [addEmpData, setAddEmpData] = useState(getEmptyEmpData());

  /**
   * To handle field value change
   */
  useEffect(() => {
    form.setFieldsValue(addEmpData);
  }, [form, addEmpData])
  
  /**
   * To Add new employee to [App.js] State and related operations
   */
  const AddEmpOperation = () => {
    let addEmpCopy = JSON.parse(JSON.stringify(addEmpData));
    /** Adding dynamic ID */
    addEmpCopy.id = generateUniqueId(usedIDList);
    /** Adding new employee to [App.js] State */
    onOk({ type: ACTIONS.add, payload: { data: addEmpCopy }});
    /** setting state to starter empty Data object */
    setAddEmpData(getEmptyEmpData());
    /**  disabling add toggle [App.js] State */
    onCancel(false);
  };

  const closeModal = () => {
    /** setting state to starter empty Data object */
    setAddEmpData(getEmptyEmpData());
    /** closing modal state[App.js] */
    onCancel(false);
  };
  
  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="Add new record"
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
        onFinish={AddEmpOperation}
        // initialValues={addEmpData}
      >
        {
          empFieldsDetail.map(field => {
            if(field.editable) {
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
                    // required
                    key={field.dataIndex}
                    id={field.dataIndex}
                    type={field.inputType}
                    placeholder={`Please Enter ${field.title}`}
                    onChange={(e) => {
                      setAddEmpData(pre => {
                        return {
                          ...pre,
                          [field.dataIndex]: e.target.value
                        }
                      })
                    }}
                  />
                </Form.Item>
              );
            };
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
            Add
          </Button>  
          <Button 
            type="secondary"
            onClick={() => setAddEmpData(getEmptyEmpData())} 
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
