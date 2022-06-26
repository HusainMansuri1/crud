import { useState, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { ACTIONS, generateUniqueId } from "helpers";

const AddEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, usedIDList 
}) => {
  const [form] = Form.useForm();

  const [value, setValue] = useState('');

  /**
   * On Form submission
   */
  const onFinish = (values) => {
    console.log('onFinish triggered')
    console.log('values:', values)
    setValue('');
    // AddEmpOperation();
  };

  useEffect(() => {
    console.log('useEffect triggered!');
    console.log('useEffect value:', value)
    form.setFieldsValue({input: value});
  }, [form, value])
  
  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="Add new record"
      // okText="Add"
      cancelText="Cancel"
      // onOk={() => AddEmpOperation()}
      onCancel={() => {
        /** setting state to starter empty Data object */
        // setAddEmpData(getEmptyEmpData());
        setValue('');
        onCancel(false);
      }}
      // footer={[
        
      // ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{input: value}}
      >
        
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
            onChange={(e) => {
              console.log('onChange triggered');
              setValue(e.target.value);
            }}
          />
        </Form.Item>

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
            onClick={
              () => { 
                console.log('Reset Triggered');
                setValue('');
                // form.resetFields();
              }
            } 
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEmployeeModal;