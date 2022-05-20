import "./App.css";
import DepartmentListComponent from "./components/department/departmentlistcomponent";
import EmployeeListComponent from "./components/employee/employeelistcomponent";
import LoginComponent from "./components/logincomponent";
import MainRouterComponent from "./components/mainroutercomponent";

function App() {
  return (
    <div className="container">
      <MainRouterComponent></MainRouterComponent>
    </div>
  );
}

export default App;
