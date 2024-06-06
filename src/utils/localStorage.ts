export const setItem = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(JSON.parse(value)) : null;
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
};
