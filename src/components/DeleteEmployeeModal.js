import { useEffect } from 'react';
import { Modal, Input, Form, Button } from 'antd';
import { ACTIONS, changeDateFormat } from "helpers";

const DeleteEmployeeModal = ({ 
  visible, onOk, onCancel, empFieldsDetail, deleteEmp, id
}) => {
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
      title="Delete selected record ?"
      onCancel={() => onCancel({
        active: false,
        id: null
      })}
      footer={[
        <>
          <Button 
            key="cancel" 
            type="secondary"
            onClick={() => onCancel({
              active: false,
              id: null
            })}>
            Close
          </Button>
          <Button 
            danger 
            key="delete"
            type="primary"
            onClick={deleteEmpOperation}>
            Delete
          </Button>
        </>
      ]}
    >
      <Form
        form={form}
        layout="vertical"
      >
        {
          empFieldsDetail.map(field => {
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

export default DeleteEmployeeModal;
