import NavigatorComponent from "../navigator";
import DepartmentService from "../../services/departmentservice";
import { useEffect, useState } from "react";

const DepartmentListComponent = () => {
  const departmentService = new DepartmentService();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
        setError(error.message);
      });
  }, []);

  return (
    <div className="container">
      <NavigatorComponent></NavigatorComponent>
      {error !== "" && <p className="text-center">{error}</p>}
      {departments.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {Object.keys(departments[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.map((record, ind) => (
              <tr key={ind}>
                {Object.keys(departments[0]).map((header, index) => (
                  <td key={index}>{record[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepartmentListComponent;
