import { useState } from "react";
import { SelectDataContext } from "../../context/selectdatacontext";
import SelectComponent from "./selectcomponent";
import ValidationErrorComponent from "./validationerrorcomponent";
import ChildComponent from "../datagrid/childcomponent";

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({});
  const [employees, setEmployees] = useState([]);
  const [isEmpNoValid, setIsEmpNoValid] = useState(true);
  const [isEmpNameValid, setIsEmpNameValid] = useState(true);
  const designations = [
    "Director",
    "CTO",
    "Accountant",
    "Project Manager",
    "Manager",
    "Lead",
    "Engineer",
    "Developer",
    "Tester",
    "Cashier",
  ];
  const departments = ["Dev", "Test", "Accounts", "HR", "System"];
  const technicalExperties = [
    "Management",
    "Teacher",
    "C++",
    "C#",
    "JAVA",
    "Python",
    "JavaScript",
    "React",
    "Angular",
    "jQuery",
    "Node.js",
    "Express",
    "nUnit",
    "jUnit",
  ];
  let error_message = "";

  const handleSave = (evt) => {
    evt.preventDefault();
    setEmployees([...employees, employee]);
  };

  const handleChange = (evt) => {
    validateForm(evt);
    if (evt.target.name === "empNo") {
      setEmployee({ ...employee, EmpNo: parseInt(evt.target.value) });
    }
    if (evt.target.name === "empName") {
      setEmployee({ ...employee, EmpName: evt.target.value });
    }
    if (evt.target.name === "designation") {
      setEmployee({ ...employee, designation: evt.target.value });
    }
    if (evt.target.name === "department") {
      setEmployee({ ...employee, department: evt.target.value });
    }
    if (evt.target.name === "expertise") {
      let selectedExpertise = Array.from(
        evt.target.selectedOptions,
        (option) => option.value
      );
      setEmployee({ ...employee, expertise: selectedExpertise });
    }
  };

  const validateForm = (event) => {
    if (event.target.name === "empNo") {
      if (
        parseInt(event.target.value) < 0 ||
        event.target.value.trim().length > 8
      ) {
        setIsEmpNoValid(false);
        return;
      }
      setIsEmpNoValid(true);
      return;
    }
    if (event.target.name === "empName") {
      if (
        event.target.value.charAt(0).toUpperCase() !=
        event.target.value.charAt(0)
      ) {
        setIsEmpNameValid(false);
        return;
      }
      setIsEmpNameValid(true);
      return;
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center">Employee Form</h3>
      {!isEmpNoValid && (
        <ValidationErrorComponent
          message={
            "EmpNo should be a positive integer and should contain maximum 8 digits."
          }
        ></ValidationErrorComponent>
      )}
      {!isEmpNameValid && (
        <ValidationErrorComponent
          message={"EmpName should have first letter in uppercase"}
        ></ValidationErrorComponent>
      )}
      <form name="formEmp">
        <div className="form-group">
          <label>EmpNo</label>
          <input
            type="number"
            className="form-control"
            name="empNo"
            onChange={handleChange}
          />
        </div>
        <div className="form-group mt-2">
          <label>EmpName</label>
          <input
            type="text"
            className="form-control"
            name="empName"
            onChange={handleChange}
          />
        </div>
        <SelectDataContext.Provider
          value={{
            label: "Designations",
            options: designations,
            isMultiSelect: false,
            name: "designation",
            onSelect: handleChange,
          }}
        >
          <SelectComponent></SelectComponent>
        </SelectDataContext.Provider>
        <SelectDataContext.Provider
          value={{
            label: "Departments",
            options: departments,
            isMultiSelect: false,
            name: "department",
            onSelect: handleChange,
          }}
        >
          <SelectComponent></SelectComponent>
        </SelectDataContext.Provider>
        <SelectDataContext.Provider
          value={{
            label: "Technical Expertise",
            options: technicalExperties,
            isMultiSelect: true,
            name: "expertise",
            onSelect: handleChange,
          }}
        >
          <SelectComponent></SelectComponent>
        </SelectDataContext.Provider>
        <button
          type="submit"
          className="btn btn-primary mt-4 mb-4"
          onClick={handleSave}
          id="btnSaveEmployee"
        >
          Save
        </button>
      </form>
      {employees.length > 0 && (
        <ChildComponent
          employees={employees}
          canEdit={true}
          canDelete={true}
        ></ChildComponent>
      )}
    </div>
  );
};

export default EmployeeForm;
