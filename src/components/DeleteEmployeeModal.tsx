import React, { useEffect } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { ACTIONS } from "helpers";

interface Props {
  visible: boolean;
  onOk: Function;
  onCancel: Function;
  empFieldsDetail: null | Fields[];
  id: null | string | number;
  deleteEmp: {} | EmpDetails;
};
const DeleteEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, deleteEmp, id
}: Props) => {
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue(deleteEmp);  
  }, [form, deleteEmp]);

  const deleteEmpOperation = () => {
    /** saving deleted employee to [App.js] State */
    onOk({ type: ACTIONS.delete, payload: { id } });
    /**  disabling delete toggle [App.js] State */
    onCancel({
      active: false,
      id: null
    });
  };

  return ( 
    <Modal
      forceRender 
      visible={visible}
      title="Delete selected record"
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
        <Form.Item>
          <Button 
            danger 
            key="delete"
            type="primary"
            onClick={deleteEmpOperation}>
            Delete
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DeleteEmployeeModal;
