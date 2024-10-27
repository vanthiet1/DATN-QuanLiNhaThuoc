const storageUtil = {
  setItem: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  },
  getItem: (key) => {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error getting from localStorage', error);
      return null;
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage', error);
    }
  },
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
};

export default storageUtil;
