import EmployeeService from "../../services/employeeservice";
import TableComponent from "../tablecomponent";
import { useNavigate } from "react-router-dom";

const { Fragment, useEffect, useState } = require("react");

const EmployeeListComponent = () => {
  const employeeService = new EmployeeService();
  const [employees, setEmployees] = useState([{}]);
  const navigate = useNavigate();

  useEffect(() => {
    employeeService
      .getAllEmployees()
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  }, []);

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleDeleteEmployee = (empId) => {
    employeeService
      .deleteEmployee(empId)
      .then((response) => {
        setEmployees(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  const handleEditEmployee = (empId) => {
    navigate(`/employees/edit/${empId}`);
  };

  return (
    <Fragment>
      <div className="text-end mb-4">
        <button className="btn btn-primary" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
      <TableComponent
        records={employees}
        onDelete={handleDeleteEmployee}
        onEdit={handleEditEmployee}
      ></TableComponent>
    </Fragment>
  );
};

export default EmployeeListComponent;
