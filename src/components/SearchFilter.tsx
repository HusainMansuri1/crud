import { Form, Input } from 'antd';
import React, { useEffect } from 'react'

interface Props {
  loadInfo: {
    loading: boolean;
    success: null | boolean;
  };
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter = ({ loadInfo, searchQuery, setSearchQuery } : Props) => {

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ searchQuery });
  }, [searchQuery]);

  return (
    <>
      <Form form={form} >
        <Form.Item
          key="searchQuery"
          label="Search (any Field)"
          name="searchQuery"
        >
          <Input 
            type="search"
            disabled={!loadInfo.success || loadInfo.loading}
            allowClear
            onChange={e => setSearchQuery(e.target.value)}
          />
        </Form.Item>
      </Form>
    </>
  )
}

export default SearchFilter;