export const getAuthToken = (token) => {
  return {
    type: "GET_AUTH_TOKEN",
    payload: token,
  };
};
