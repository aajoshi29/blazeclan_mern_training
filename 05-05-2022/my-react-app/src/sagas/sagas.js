import { all, call, put, takeLatest } from "redux-saga/effects";
import EmployeeService from "../services/employeeservice";

function getAllEmployees() {
  const employeeService = new EmployeeService();
  const response = employeeService
    .getAllEmployees()
    .then((result) => result.data);
  return Promise.resolve(response);
}

function getEmployeeDetailsById(empId) {
  const employeeService = new EmployeeService();
  const response = employeeService
    .getEmployeeById(empId)
    .then((result) => result.data);
  return Promise.resolve(response);
}

function deleteEmployeeById(empId) {
  const employeeService = new EmployeeService();
  const response = employeeService
    .deleteEmployee(empId)
    .then((result) => result.data);
  return Promise.resolve(response);
}

function addNewEmployee(emp) {
  const employeeService = new EmployeeService();
  const response = employeeService
    .addEmployee(emp)
    .then((result) => result.data);
  return Promise.resolve(response);
}

function updateExistingEmployee(emp) {
  const employeeService = new EmployeeService();
  const response = employeeService
    .editEmployee(emp)
    .then((result) => result.data);
  return Promise.resolve(response);
}

function* handleListEmployees() {
  try {
    const response = yield call(getAllEmployees);
    yield put({
      type: "LIST_EMPLOYEES_SUCCESS",
      employees: response.data,
    });
  } catch (ex) {
    yield put({
      type: "LIST_EMPLOYEES_FAILED",
      message: `Error Occurred ${ex.message}`,
    });
  }
}

function* handleGetEmployeeById(action) {
  try {
    const response = yield call(getEmployeeDetailsById, action.empId);
    yield put({
      type: "GET_EMPLOYEE_BY_ID_SUCCESS",
      employee: response.data,
    });
  } catch (ex) {
    yield put({
      type: "GET_EMPLOYEE_BY_ID_FAILED",
      message: `Error Occurred ${ex.message}`,
    });
  }
}

function* handleDeleteEmployee(action) {
  try {
    const response = yield call(deleteEmployeeById, action.empId);
    yield put({
      type: "DELETE_EMPLOYEE_SUCCESS",
      employees: response.data,
    });
  } catch (ex) {
    yield put({
      type: "DELETE_EMPLOYEE_FAILED",
      message: `Error Occurred ${ex.message}`,
    });
  }
}

function* handleAddEmployee(action) {
  try {
    const response = yield call(addNewEmployee, action.employee);
    yield put({
      type: "ADD_EMPLOYEE_SUCCESS",
      employees: response.data,
    });
  } catch (ex) {
    yield put({
      type: "ADD_EMPLOYEE_FAILED",
      message: `Error Occurred ${ex.message}`,
    });
  }
}

function* handleUpdateEmployee(action) {
  try {
    const response = yield call(updateExistingEmployee, action.employee);
    yield put({
      type: "UPDATE_EMPLOYEE_SUCCESS",
      employees: response.data,
    });
  } catch (ex) {
    yield put({
      type: "UPDATE_EMPLOYEE_FAILED",
      message: `Error Occurred ${ex.message}`,
    });
  }
}

function* listEmployees() {
  yield takeLatest("LIST_EMPLOYEES", handleListEmployees);
}

function* getEmployeeById() {
  yield takeLatest("GET_EMPLOYEE_BY_ID", handleGetEmployeeById);
}

function* deleteEmployee() {
  yield takeLatest("DELETE_EMPLOYEE", handleDeleteEmployee);
}

function* addEmployee() {
  yield takeLatest("ADD_EMPLOYEE", handleAddEmployee);
}

function* updateEmployee() {
  yield takeLatest("UPDATE_EMPLOYEE", handleUpdateEmployee);
}

export function* rootSaga() {
  yield all([
    listEmployees(),
    getEmployeeById(),
    deleteEmployee(),
    addEmployee(),
    updateEmployee(),
  ]);
}
