interface EmpDetails {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  dob: number | string;
};

interface Fields {
  title: string;
  dataIndex: string;
  key: string;
  inputType: string;
  editable: boolean;
};