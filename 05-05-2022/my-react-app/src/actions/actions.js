export const setUserInfo = (user) => {
  return {
    type: "SET_USER",
    user: user,
  };
};

export const getUserInfo = () => {
  return {
    type: "GET_USER",
  };
};

export const getAllEmployees = () => {
  return {
    type: "LIST_EMPLOYEES",
  };
};

export const getEmployeeById = (empId) => {
  return {
    type: "GET_EMPLOYEE_BY_ID",
    empId: empId,
  };
};

export const deleteEmployee = (empId) => {
  return {
    type: "DELETE_EMPLOYEE",
    empId: empId,
  };
};

export const addEmployee = (employee) => {
  return {
    type: "ADD_EMPLOYEE",
    employee: employee,
  };
};

export const updateEmployee = (employee) => {
  return {
    type: "UPDATE_EMPLOYEE",
    employee: employee,
  };
};
