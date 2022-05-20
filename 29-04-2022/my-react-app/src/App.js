import "./App.css";
import DepartmentListComponent from "./components/department/departmentlistcomponent";
import EmployeeListComponent from "./components/employee/employeelistcomponent";
import LoginComponent from "./components/logincomponent";

function App() {
  return (
    <div className="container">
      <LoginComponent></LoginComponent>
      <EmployeeListComponent></EmployeeListComponent>
      <DepartmentListComponent></DepartmentListComponent>
    </div>
  );
}

export default App;
