import { json } from "react-router-dom";

export const LocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err: unknown) {
      console.log(err);
    }
  };
  const getItem = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (err: unknown) {
      console.log(err);
    }
  };
  return { setItem, getItem };
};
