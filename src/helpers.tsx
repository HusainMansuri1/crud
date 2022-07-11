/** 
 * Actions to be used by useReducer
 */
export const ACTIONS = {
  set: '=',
  more: '+=',
  add: '+',
  delete: '-',
  edit: '~'
};

/**
 * To generate unique 4 digit ID
 * @param existingIds 
 * @returns new unique id
 */
export const generateUniqueId = (existingIds: string[]): string => {
  // console.log("entry");
  let newId:string = String(Math.floor(Math.random() * (9999 - 1001) + 1001));
  // console.log("id:", newId);

  if (existingIds.includes(newId)) {
    /** if newly generated ID exist in existingIds array then call self to generate a new ID */
    // console.log("duplicate");
    generateUniqueId(existingIds);
  } 
  /** if newly generated ID does not exist in existingIds array then return it */
  // console.log("og return", newId);
  return String(newId);
};

/**
 * To change Date format
 * @param rawDate unformatted date
 * @param changeToFormat desired changed date format
 * @returns date in desired format
 */
export const changeDateFormat = (rawDate:any, changeToFormat: 'api' | 'html') => {
  /**
   * To add zero to one digit value
   * @param value numerical value
   * @returns appends zero to value if value is of one digit
   */
  const addZero = (value:number): number | string => (value < 10 ? "0" + value : value);  
  
  switch (changeToFormat) {
    case 'api':
      /** recieved Date format is yyyy-mm-dd & desired format is dd/mm/yyyy */
      let date:Date = new Date(rawDate); 
      return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;

    case 'html':
      /** recieved Date format is dd/mm/yyyy & desired format is yyyy-mm-dd */
      let dateArr = rawDate.split("/");
      let newDate:Date = new Date(dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0]); 
      return `${addZero(newDate.getFullYear())}-${addZero(newDate.getMonth() + 1)}-${addZero(newDate.getDate())}`;
      
    default:
      return rawDate;
  }
};
