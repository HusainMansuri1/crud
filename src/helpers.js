/** 
 * Actions to be used by useReducer
 */
export const ACTIONS = {
  set: '=',
  add: '+',
  delete: '-',
  reset: '!',
  edit: '~'
}

/**
 * To generate unique 4 digit ID
 * @param {*array} existiIds 
 * @returns new unique id
 */
export const generateUniqueId = (existiIds) => {
  // console.log("entry");
  let newId = Math.floor(Math.random() * (9999 - 1001) + 1001);
  // console.log("id:", newId);
  let existingIds = existiIds;

  if (existingIds.includes(newId)) {
    /** if newly generated ID exist in existingIds array then call self to generate a new ID */
    // console.log("duplicate");
    generateUniqueId();
  } else {
    /** if newly generated ID does not exist in existingIds array then return it */
    // console.log("og return", newId);
    return newId;
  }
};

/**
 * To change Date format
 * @param {*string} rawDate unformatted date
 * @param {*string} changeToFormat desired changed date format
 * @returns date in desired format
 */
export const changeDateFormat = (rawDate, changeToFormat) => {
  /**
   * To add zero to one digit value
   * @param {*number} value numerical value
   * @returns appends zero to value if value is of one digit
   */
  const addZero = (value) => (value < 10 ? "0" + value : value);  
  
  switch (changeToFormat) {
    case 'api':
      /** recieved Date format is yyyy-mm-dd & desired format is dd/mm/yyyy */
      let date = new Date(rawDate); 
      return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;

    case 'html':
      /** recieved Date format is dd/mm/yyyy & desired format is yyyy-mm-dd */
      let dateArr = rawDate.split("/");
      let dateStr = new Date(dateArr[2] + '/' + dateArr[1] + '/' + dateArr[0]);
      let newDate = new Date(dateStr); 
      return `${addZero(newDate.getFullYear())}-${addZero(newDate.getMonth() + 1)}-${addZero(newDate.getDate())}`;
      
    default:
      return rawDate;
  }
};