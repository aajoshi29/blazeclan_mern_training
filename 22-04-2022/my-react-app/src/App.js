import logo from "./logo.svg";
import "./App.css";
import Calculator from "./components/calculator";
import CourseList from "./components/courselist";
import ParentComponent from "./components/datagrid/parentcomponent";
import EmployeeForm from "./components/employee/employeeform";

function App() {
  return (
    <div>
      <Calculator></Calculator>
      <hr className="mt-4"></hr>
      <CourseList></CourseList>
      <hr className="mt-4"></hr>
      <ParentComponent></ParentComponent>
      <hr className="mt-4"></hr>
      <EmployeeForm></EmployeeForm>
    </div>
  );
}

export default App;
