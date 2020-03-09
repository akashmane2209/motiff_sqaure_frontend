let headers = {};

export const getCommonHeaderOptions = () => {
  return {
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
};
