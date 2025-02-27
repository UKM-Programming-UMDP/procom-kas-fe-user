export const useLocalStorage = () => {
  const setItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err: unknown) {
      console.log(err);
    }
  };
  const getItem = (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err: unknown) {
      console.log(err);
    }
  };
  const removeItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (err: unknown) {
      console.log(err);
    }
  };
  return { setItem, getItem, removeItem };
};
