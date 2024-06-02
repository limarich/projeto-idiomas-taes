export const getLocalStorageValue = <T>(key: string): T | null => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      console.log("valor", storedValue);
      return JSON.parse(storedValue) as T;
    } catch (error) {
      console.error(`Error parsing stored value for key '${key}':`, error);
      return null;
    }
  }
  return null;
};

export const setLocalStorageValue = (key: string, value: string) => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error serializing value for key '${key}':`, error);
  }
};
