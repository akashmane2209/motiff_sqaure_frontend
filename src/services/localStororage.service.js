export const LocalStorageService = {
  removeItem(key) {
    localStorage.removeItem(key);
  },
  removeAll() {
    localStorage.clear();
  },
  addOrUpdateItem(key, value, ttl_ms = null) {
    localStorage.setItem(key, value);
  },
  getItem(key) {
    let val = localStorage.getItem(key);
    if (val) {
      const jsonObj = JSON.parse(val);
      return jsonObj;
    }
    return null;
  }
};

export const STORAGE_KEYS = {
  IS_ADMIN: 'is_admin'
};
