import { useState } from 'react';
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

  /**
   * On Form submission
   */
  const onFinish = (values) => {
    console.log('onFinish triggered')
    console.log('values:', values)
    // AddEmpOperation();
  };
  
  return ( 
    <Modal
      visible={visible}
      title="Add new record"
      // okText="Add"
      cancelText="Cancel"
      // onOk={() => AddEmpOperation()}
      onCancel={() => {
        /** setting state to starter empty Data object */
        setAddEmpData(getEmptyEmpData());
        onCancel(false);
      }}
      // footer={[
        
      // ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        {
          <Form.Item
            key="input"
            label="label"
            name="input"
            rules={[
              { 
                required: true, 
                message: `Please enter your input` 
              },
            ]}
          >
            <Input 
              onChange={() => {
                console.log('onChange triggered');
              }}
            />
          </Form.Item>
          // empFieldsDetail.map(field => {
          //   if(field.editable) {
          //     return(
          //       <Form.Item
          //         key={field.dataIndex}
          //         label={field.title}
          //         name={field.dataIndex}
          //         rules={[
          //           { 
          //             required: true, 
          //             message: `Please enter your ${field.title}` 
          //           },
          //         ]}
          //       >
          //         <Input 
          //           // required
          //           key={field.dataIndex}
          //           id={field.dataIndex}
          //           // value={addEmpData[field.dataIndex]}
          //           value="sop"
          //           type={field.inputType}
          //           placeholder={`Please Enter ${field.title}`}
          //           onChange={(e) => {
          //             setAddEmpData(pre => {
          //               return {
          //                 ...pre,
          //                 [field.dataIndex]: e.target.value
          //               }
          //             })
          //           }}
          //         />
          //       </Form.Item>
          //     );
          //   };
          // })
        }
        <Form.Item style={{ marginTop: 30, marginBottom: 0 }}>
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