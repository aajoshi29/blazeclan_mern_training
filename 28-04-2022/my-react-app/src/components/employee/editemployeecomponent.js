import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DepartmentService from "../../services/departmentservice";
import EmployeeService from "../../services/employeeservice";

const EditEmployeeComponent = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    salary: "",
    dept_id: "",
  });
  const employeeService = new EmployeeService();
  const departmentService = new DepartmentService();
  const { id } = useParams();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    employeeService
      .getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });

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
      .editEmployee(employee)
      .then((response) => {
        console.log(response.data.data);
        navigate("/employees");
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  return (
    <div className="container mt-2">
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
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditEmployeeComponent;
