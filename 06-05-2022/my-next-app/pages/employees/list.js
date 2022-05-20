import NavigatorComponent from "../navigator";
import { useEffect, useState } from "react";
import EmployeeService from "../../services/employeeservice";
import { useRouter } from "next/router";

const EmployeeListComponent = () => {
  const [employees, setEmployees] = useState([]);
  const employeeService = new EmployeeService();
  const router = useRouter();

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

  const navigateToAdd = () => {
    router.push({
      pathname: "/employees/add",
    });
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

  const navigateToEdit = (empId) => {
    router.push({
      pathname: "/employees/edit",
      query: { empId: empId },
    });
  };

  return (
    <div className="container">
      <NavigatorComponent></NavigatorComponent>
      <div className="text-end mb-4">
        <button className="btn btn-primary" onClick={navigateToAdd}>
          Add Employee
        </button>
      </div>
      {employees.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {Object.keys(employees[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((record, ind) => (
              <tr key={ind}>
                {Object.keys(employees[0]).map((header, index) => (
                  <td key={index}>{record[header]}</td>
                ))}
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => navigateToEdit(record.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEmployee(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeListComponent;
