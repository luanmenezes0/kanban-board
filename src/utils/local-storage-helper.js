export const getFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(item));
};

export const saveToLocalStorage = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};
