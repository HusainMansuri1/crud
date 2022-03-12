import './Button.scss';

const Button = (props) => {
  return ( 
    <button
      className={`${props.classes} cmn-btn`}
      // onClick={() => props.click({ 
      //   type: props.type, 
      //   payload: { 
      //     data: props.payload.data,
      //     index: props.payload.index 
      //   } 
      // })}
    >
      {props.text}
    </button>
    
    //  <Button 
    //  classes="btn--edit"
    //  text="edit"
    //  onClick={() => console.log('click')}
    //  click={props.change}
    //  type={ACTIONS.edit}
    //  payload={{
    //    data: {
    //      name: "husain"
    //    },
    //    index: props.index
    //  }}
  //  />
  );
}
 
export default Button;