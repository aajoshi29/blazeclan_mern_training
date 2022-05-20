import { useEffect, useState } from "react";
import DepartmentService from "../../services/departmentservice";
import EmployeeService from "../../services/employeeservice";
import { useRouter } from "next/router";
import NavigatorComponent from "../navigator";

const AddEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: "",
    dept_id: "1",
  });
  const employeeService = new EmployeeService();
  const departmentService = new DepartmentService();
  const [departments, setDepartments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  }, []);

  const handleChange = (event) => {
    if (event.target.name === "empName") {
      setEmployee((state) => ({ ...state, name: event.target.value }));
    }
    if (event.target.name === "designation") {
      setEmployee((state) => ({ ...state, designation: event.target.value }));
    }
    if (event.target.name === "salary") {
      setEmployee((state) => ({
        ...state,
        salary: parseInt(event.target.value),
      }));
    }
    if (event.target.name === "deptId") {
      setEmployee((state) => ({
        ...state,
        dept_id: parseInt(event.target.value),
      }));
    }
  };

  const handleSave = () => {
    employeeService
      .addEmployee(employee)
      .then((response) => {
        router.push({
          pathname: "/employees/list",
        });
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  return (
    <div className="container mt-2">
      <NavigatorComponent></NavigatorComponent>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={employee.name}
          onChange={handleChange}
          name="empName"
        />
      </div>
      <div className="form-group mt-2">
        <label>Designation:</label>
        <input
          type="text"
          className="form-control"
          value={employee.designation}
          onChange={handleChange}
          name="designation"
        />
      </div>
      <div className="form-group mt-2">
        <label>Salary:</label>
        <input
          type="number"
          className="form-control"
          value={employee.salary}
          onChange={handleChange}
          name="salary"
        />
      </div>
      <div className="form-group mt-2 mb-2">
        <label>Department:</label>
        <select
          className="form-control"
          name="deptId"
          value={employee.dept_id}
          onChange={handleChange}
        >
          {departments.map((dept, index) => (
            <option key={index}>{dept.id}</option>
          ))}
        </select>
      </div>
      <div className="form-group me-2 d-inline">
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="form-group d-inline">
        <button
          className="btn btn-danger"
          onClick={() =>
            router.push({
              pathname: "/employees/list",
            })
          }
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEmployeeComponent;
