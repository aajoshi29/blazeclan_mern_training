import { combineReducers } from "redux";

const initialState = [];

const departmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DEPARTMENT":
      return [...state, action.dept];
    default:
      return state;
  }
};

const selectDepartmentReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_DEPARTMENT":
      return action.dept;
    default:
      return state;
  }
};

const reducers = combineReducers({
  departmentReducer,
  selectDepartmentReducer,
});

export default reducers;
