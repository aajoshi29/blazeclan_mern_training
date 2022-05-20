import React from "react";
import { act } from "react-dom/test-utils";
import EmployeeForm from "../components/employee/employeeform";
import { render, fireEvent } from "@testing-library/react";

describe("The test suite for the EmployeeForm", () => {
  let DOMContainer = null;

  beforeEach(() => {
    DOMContainer = document.createElement("div");
    document.body.appendChild(DOMContainer);
  });

  it("Validation messages should be shown for invalid input", () => {
    act(() => {
      render(<EmployeeForm />, document);
    });

    const empNoInput = document.getElementsByName("empNo")[0];
    fireEvent.change(empNoInput, {
      target: { value: "-1" },
    });

    const empNameInput = document.getElementsByName("empName")[0];
    fireEvent.change(empNameInput, {
      target: { value: "aditya" },
    });

    const empIdErrorMessageBox =
      document.getElementsByClassName("alert-danger")[0];
    const expectedEmpIdErrorMessage =
      "EmpNo should be a positive integer and should contain maximum 8 digits.";

    expect(empIdErrorMessageBox).toBeTruthy();
    expect(empIdErrorMessageBox.innerHTML).toBe(expectedEmpIdErrorMessage);

    const empNameErrorMessageBox =
      document.getElementsByClassName("alert-danger")[1];
    const expectedEmpNameErrorMessage =
      "EmpName should have first letter in uppercase";

    expect(empNameErrorMessageBox).toBeTruthy();
    expect(empNameErrorMessageBox.innerHTML).toBe(expectedEmpNameErrorMessage);
  });

  it("New row should be added to the table after save button is clicked", () => {
    act(() => {
      render(<EmployeeForm />, document);
    });

    const empNoInput = document.getElementsByName("empNo")[0];
    fireEvent.change(empNoInput, {
      target: { value: "100" },
    });

    const empNameInput = document.getElementsByName("empName")[0];
    fireEvent.change(empNameInput, {
      target: { value: "Aditya Joshi" },
    });

    const empDesignationInput = document.getElementsByName("designation")[0];
    fireEvent.change(empDesignationInput, {
      target: { value: "CTO" },
    });

    const empDepartmentInput = document.getElementsByName("department")[0];
    fireEvent.change(empDepartmentInput, {
      target: { value: "Test" },
    });

    const empTechnicalExpertiseInput =
      document.getElementsByName("expertise")[0];
    fireEvent.change(empTechnicalExpertiseInput, {
      target: { value: "jUnit" },
    });

    fireEvent.click(document.getElementById("btnSaveEmployee"));
    const empTable = document.getElementsByClassName("table");

    expect(empTable).toBeTruthy();
  });
});
