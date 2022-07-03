import React from 'react';

const Header = (props:{
  empCount: number
}) => {
  return ( 
    <header className="app-header">
      <div className="container">
        No of Employee: {props.empCount}
      </div>
    </header>
  );
}
 
export default Header;