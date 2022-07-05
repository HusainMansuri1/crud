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
    let emptyData:any = {};
    empFieldsDetail && empFieldsDetail.map((field) => {
      if(field.editable) {
        return emptyData[field.dataIndex] = '';
      }
    });
    return emptyData;
  };
  const emptyEmpData = getEmptyEmpData();

  /**
   * To get dummy data for all fields which will be used in filling form
   * @returns Object filled with dummy data for all keys
   */
  const getDummyEmpData = (): object => {
    let dummyData:any = {...emptyEmpData};

    Object.keys(dummyData).forEach(key => {
      switch (key) {
        case "firstName":
          dummyData.firstName = "John";
          return;
        case "lastName":
          dummyData.lastName = "Doe";
          return;
        case "email":
          dummyData.email = "johndoe@dummyapis.com";
          return;
        case "contactNumber":
          dummyData.contactNumber = "4759632158";
          return;
        case "dob":
          dummyData.dob = new Date().toISOString().slice(0, 10);
          return;
        default:
          return;
      };
    });

    return dummyData;
  };

  /**
   * To store Add operation State
   */
  const [addEmpData, setAddEmpData] = useState(emptyEmpData);

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
    setAddEmpData(emptyEmpData);
  }, [empFieldsDetail]);
  
  /**
   * To Add new employee to [App.js] State and related operations
   */
  const AddEmpOperation = () => {
    let addEmpCopy = JSON.parse(JSON.stringify(addEmpData));
    /** Adding dynamic ID & key*/
    const id = generateUniqueId(usedIDList);
    addEmpCopy.id = id;
    addEmpCopy.key = id;
    /** Adding new employee to [App.js] State */
    onOk({ type: ACTIONS.add, payload: { data: addEmpCopy }});
    /** setting state to starter empty Data object */
    setAddEmpData(emptyEmpData);
    /**  disabling add toggle [App.js] State */
    onCancel(false);
  };

  const closeModal = () => {
    /** setting state to starter empty Data object */
    setAddEmpData(emptyEmpData);
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
        <>
        <Button 
          key="cancel" 
          onClick={closeModal}>
          Close
        </Button>
        </>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={AddEmpOperation}
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
            onClick={() => setAddEmpData(getDummyEmpData())} 
            style={{ marginRight: 10 }}
          >
            Fill Data
          </Button>
          <Button 
            onClick={() => setAddEmpData(emptyEmpData)} 
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;
