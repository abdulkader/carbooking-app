export const localStore = {
  getItem: (key: string) => {
    if(typeof window === 'undefined') return null;
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },
  setItem: (key: string, value: any) => {
    if(typeof window === 'undefined') return null;
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    if(typeof window === 'undefined') return null;
    localStorage.removeItem(key);
  },
};