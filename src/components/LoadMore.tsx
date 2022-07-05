import React, { useRef, useReducer, useEffect, useState } from "react";
import { Table, Button, Form, Input, notification, InputNumber } from "antd";

interface Props {
  loadInfo: {
    loading: boolean;
    success: null | boolean;
  };
  apiLoadMoreCount: number;
  setApiLoadMoreToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setApiLoadMoreCount: React.Dispatch<React.SetStateAction<number>>;
};

const LoadMore = ({
  loadInfo, apiLoadMoreCount, setApiLoadMoreToggle, setApiLoadMoreCount
}: Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ apiLoadMoreInput: apiLoadMoreCount });  
  }, [form, apiLoadMoreCount]);

  return(
    <Form 
      form={form}
      layout="inline"
      onFinish={() => setApiLoadMoreToggle(prevState => !prevState)}
    >
    <Form.Item
      name="apiLoadMoreInput"
      rules={[{ 
        required: true, 
        message: "Please enter numerical value" 
      }]}
    >
      <Input
      // bordered
        type="number"
        placeholder="Load More Count"
        min={1}
        max={100}
        onChange={(e) => {
          setApiLoadMoreCount(Number(e.target.value));
        }}
      /> 
    </Form.Item>
    <Button
        disabled={!loadInfo.success || loadInfo.loading}
        htmlType="submit"
        type="primary"
        style={{ marginBottom: 20 }}
      >
        Load More
    </Button>
  </Form>
  );
};

export default LoadMore;
