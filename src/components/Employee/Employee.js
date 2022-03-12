import Button from 'components/Button/Button';
import './Employee.scss';

const Employee = (props) => {
  return ( 
    <div key={props.emp.id} className="emp-data-row row">
      {Object.keys(props.emp).map(empKey => (
        <div key={empKey} className={`col emp-data-col`}>{props.emp[empKey]}</div>
      ))}
      <button
        className="cmn-btn"
        onClick={props.edit}
      >
        edit
      </button>
    </div>
  );
}

export default Employee;