export const ACTIONS = {
  set: '=',
  add: '+',
  delete: '-',
  edit: '~'
}

export const generateUniqueId = (existiIds) => {
  console.log("entry");
  let newId = Math.floor(Math.random() * (9999 - 1001) + 1001);
  console.log("id:", newId);
  let existingIds = existiIds;

  if (existingIds.includes(newId)) {
    console.log("duplicate");
    generateUniqueId();
  } else {
    console.log("og return", newId);
    return newId;
  }
};

export const changeDateFormat = (rawDate) => {
  const addZero = (value) => (value < 10 ? "0" + value : value);
  let date = new Date(rawDate);
  return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()}`;
};