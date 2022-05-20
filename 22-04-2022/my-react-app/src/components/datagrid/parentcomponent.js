import { useState } from "react";
import ChildComponent from "./childcomponent";

const ParentComponent = () => {
  let [employees, setEmployees] = useState([
    {
      empId: 100,
      empName: "Alex",
      department: "IT",
      designation: "Manager",
      salary: 70000,
    },
    {
      empId: 200,
      empName: "Bob",
      department: "Admin",
      designation: "Associate",
      salary: 35000,
    },
    {
      empId: 300,
      empName: "Charlie",
      department: "HR",
      designation: "Associate",
      salary: 35000,
    },
    {
      empId: 400,
      empName: "David",
      department: "Accounts",
      designation: "Manager",
      salary: 60000,
    },
  ]);

  const handleDeleteEmployee = (empId) => {
    employees = employees.filter((emp) => emp.empId !== Number(empId));
    setEmployees(employees);
  };

  if (employees.length > 0)
    return (
      <ChildComponent
        employees={employees}
        canEdit={true}
        canDelete={true}
        onDelete={(empId) => handleDeleteEmployee(empId)}
      ></ChildComponent>
    );
};

export default ParentComponent;
