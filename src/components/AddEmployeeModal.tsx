import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ACTIONS, generateUniqueId } from "helpers";

interface Props {
  visible: boolean;
  onOk: Function;
  onCancel: Function;
  empFieldsDetail: null | Fields[];
  usedIDList: string[];
};

const AddEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, usedIDList 
}: Props) : JSX.Element => {
  
  const [form] = Form.useForm();

  /**
   * To generate starter Data object with all editable fields as keys and empty values
   * @returns {object} 
   */
  const getEmptyEmpData = (): object => {
    let emptyEmpData:any = {};
    empFieldsDetail && empFieldsDetail.map((field) => {
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
   * To handle field change
   */
  useEffect(() => {
    setAddEmpData(getEmptyEmpData());
  }, [empFieldsDetail]);
  
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
      forceRender={true}
      visible={visible}
      title="Add new record"
      onCancel={closeModal}
      footer={[
        <Button 
          key="cancel" 
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
          empFieldsDetail?.map(field => {
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
