import EmployeeListComponent from "./employee/employeelistcomponent";
import DepartmentListComponent from "./department/departmentlistcomponent";
import LoginComponent from "./logincomponent";
import { Routes, Route } from "react-router-dom";
import HomeComponent from "./homecomponent";
import AddEmployeeComponent from "./employee/addemployeecomponent";
import AddDepartmentComponent from "./department/adddepartmentcomponent";
import EditEmployeeComponent from "./employee/editemployeecomponent";
import EditDepartmentComponent from "./department/editdepartmentcomponent";

const MainRouterComponent = () => {
  return (
    <div className="container">
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<HomeComponent />}>
          <Route path="/employees/add" element={<AddEmployeeComponent />} />
          <Route
            path="/employees/edit/:id"
            element={<EditEmployeeComponent />}
          />
          <Route path="/employees" element={<EmployeeListComponent />} />
          <Route path="/departments/add" element={<AddDepartmentComponent />} />
          <Route
            path="/departments/edit/:id"
            element={<EditDepartmentComponent />}
          />
          <Route path="/departments" element={<DepartmentListComponent />} />
        </Route>
      </Routes>
    </div>
  );
};

export default MainRouterComponent;
