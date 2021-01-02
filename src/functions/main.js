export const validateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

export const changeTab = (tabID) => {
  if (tabID === "tab-1") {
    document.getElementById("tab-2").checked = false;
    document.getElementById("tab-1").checked = true;
  } else {
    document.getElementById("tab-1").checked = false;
    document.getElementById("tab-2").checked = true;
  }
};
