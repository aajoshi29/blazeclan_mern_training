import EmployeeService from "../../services/employeeservice";
import TableComponent from "../tablecomponent";

const { Fragment, useEffect, useState } = require("react");

const EmployeeListComponent = () => {
  const employeeService = new EmployeeService();
  const [employees, setEmployees] = useState([{}]);

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

  return (
    <Fragment>
      <TableComponent records={employees}></TableComponent>
    </Fragment>
  );
};

export default EmployeeListComponent;
