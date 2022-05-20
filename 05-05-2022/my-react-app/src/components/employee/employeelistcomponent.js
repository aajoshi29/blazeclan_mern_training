import EmployeeService from "../../services/employeeservice";
import TableComponent from "../tablecomponent";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, getAllEmployees } from "../../actions/actions";

const { Fragment, useEffect, useState } = require("react");

const EmployeeListComponent = () => {
  let employees = useSelector((state) => state.employeeReducer.employees);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.isLoggedIn) {
      dispatch(getAllEmployees());
    }
  }, []);

  const handleAddEmployee = () => {
    navigate("/employees/add");
  };

  const handleDeleteEmployee = (empId) => {
    if (user && user.isLoggedIn) {
      dispatch(deleteEmployee(empId));
    }
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
      {employees?.length > 0 && (
        <TableComponent
          records={employees}
          onDelete={handleDeleteEmployee}
          onEdit={handleEditEmployee}
        ></TableComponent>
      )}
    </Fragment>
  );
};

export default EmployeeListComponent;
