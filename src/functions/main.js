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

export const isEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
};

export const errorShowHideMessage = (divID) => {
  document.getElementById(divID).style.display = "block";
  setTimeout(function () {
    document.getElementById(divID).style.display = "none";
  }, 3000);
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
