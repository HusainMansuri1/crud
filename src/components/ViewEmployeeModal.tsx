import React, { useEffect } from 'react';
import { Modal, Input, Form, Button } from 'antd';

interface Props {
  visible: boolean;
  onCancel: Function;
  empFieldsDetail: null | Fields[];
  viewEmp: {} | EmpDetails;
};

const ViewEmployeeModal = ({ 
  visible, onCancel, empFieldsDetail, viewEmp 
}: Props) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(viewEmp);  
  }, [form, viewEmp]);

  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="View selected record"
      onCancel={() => onCancel({
        active: false,
        id: null
      })}
      footer={[
        <Button 
          key="cancel" 
          onClick={() => onCancel({
            active: false,
            id: null
          })}>
          Close
        </Button>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      >
        {
          empFieldsDetail?.map(field => {
            return(
              <Form.Item
                key={field.dataIndex}
                label={field.title}
                name={field.dataIndex}
              >
                <Input
                  readOnly 
                  key={field.dataIndex}
                  id={field.dataIndex}
                  type={field.inputType}
                />
              </Form.Item>
            );
          })
        }
      </Form>
    </Modal>
  );
}

export default ViewEmployeeModal;
