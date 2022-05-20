import { combineReducers } from "redux";

const userInitialState = {};
const employeesInitialState = [];

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { user: action.user };
    default:
      return state;
  }
};

const employeeReducer = (state = employeesInitialState, action) => {
  switch (action.type) {
    case "LIST_EMPLOYEES_SUCCESS":
      return { employees: action.employees };
    case "GET_EMPLOYEE_BY_ID_SUCCESS":
      return { employee: action.employee };
    case "DELETE_EMPLOYEE_SUCCESS":
      return { employees: action.employees };
    case "ADD_EMPLOYEE_SUCCESS":
      return { employees: action.employees };
    case "UPDATE_EMPLOYEE_SUCCESS":
      return { employees: action.employees };
    default:
      return state;
  }
};

const reducers = combineReducers({
  userReducer,
  employeeReducer,
});

export default reducers;
