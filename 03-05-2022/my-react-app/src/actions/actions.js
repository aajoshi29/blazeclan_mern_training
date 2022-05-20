export const addDepartment = (department) => {
  return {
    type: "ADD_DEPARTMENT",
    dept: department,
  };
};

export const listDepartments = () => {
  return {
    type: "LIST_DEPARTMENTS",
  };
};

export const selectDepartment = (department) => {
  return {
    type: "SELECT_DEPARTMENT",
    dept: department,
  };
};
