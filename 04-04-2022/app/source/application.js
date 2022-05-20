class Employee {
  #EmpNo = 0;
  #EmpName = "";
  #DeptName = "";
  #Designation = "";
  #Salary = 0;

  set EmpNo(v) {
    this.#EmpNo = v;
  }
  get EmpNo() {
    return this.#EmpNo;
  }
  set EmpName(v) {
    this.#EmpName = v;
  }
  get EmpName() {
    return this.#EmpName;
  }
  set DeptName(v) {
    this.#DeptName = v;
  }
  get DeptName() {
    return this.#DeptName;
  }
  set Designation(v) {
    this.#Designation = v;
  }
  get Designation() {
    return this.#Designation;
  }
  set Salary(v) {
    this.#Salary = v;
  }
  get Salary() {
    return this.#Salary;
  }
}

class EmployeeLogic {
  #employees = [];
  #departments = ["IT", "HRD", "SALES", "ADMIN", "ACCOUNTS"];
  #designations = [
    "Engineer",
    "Manager",
    "Representative",
    "Clerk",
    "Assistant",
  ];
  constructor() {
    // Initialize the Employees array like properties from the Employee class
    this.#employees = [];
  }

  #validateInput(op, emp) {
    // Logic to validate the Employee Object
    // EmpNo: Non Negative and Unique
    // EmpName: FirstName {single-space} MiddleName {single-space} LastName
    // DeptName: Must be either of the following, IT, HRD, SALES, ADMIN, ACCOUNTS
    // Designation: MUST be either of the following, Engineer, Manager, Representative, Clerk, Assistant
    // IT (Engineer, Manager)
    // SALES (Manager, Representative, Assistant)
    // HRD (Manager, Clerk)
    // ADMIN (Manager, Clerk, Assistant)
    // ACCOUNTS (Manager, Clerk)
    if (emp.EmpNo < 0) return false;

    if (
      op === "add" &&
      this.getEmployees().filter((employee) => emp.EmpNo === employee.EmpNo)
        .length > 0
    ) {
      return false;
    }

    if (!this.#departments.includes(emp.DeptName)) return false;

    if (!this.#designations.includes(emp.Designation)) return false;

    return true; //  if validation rules are successful
  }

  getEmployees() {
    return this.#employees;
  }
  addEmployee(emp) {
    // call for validate
    if (!this.#validateInput("add", emp)) {
      return;
    }
    this.#employees.push(emp);
    return this.#employees;
  }
  updateEmployee(id, emp) {
    // call for validate
    // 1. Logic to search adn then update Employee
    if (!this.#validateInput("update", emp)) {
      return;
    }
    this.#employees = this.#employees.filter(
      (employee) => employee.EmpNo !== id
    );
    this.#employees.push(emp);
    return this.#employees;
  }

  deleteEmployee(id, emp) {
    // 1. Logic to search adn then delete Employee
    if (!this.#validateInput("delete", emp)) {
      return;
    }
    this.#employees = this.#employees.filter(
      (employee) => employee.EmpNo !== id
    );
    return this.#employees;
  }
  searchEmployee(searchObject) {
    // possible value for search object may be as follows
    // EmpNo:1, EmpName:'DDDD', DeptName:'ggg', Designation:'dfff'
    // Search from employee has to0 takes place based on searchObject and data will be returned accordingly
    return this.#employees;
  }

  searchComplexEmployee(searchObject) {
    // possible value for search object may be as follows
    //  {DeptName:'IT', Designation:'Manager'} and condition
    // This Must return all Employee in IT Dept those are Managers

    return this.#employees;
  }
  searchEmployeeByCriria(searchObject) {
    // possible value for search object may be as follows
    // EmpName: 'A', all Employees Starts from A

    return this.#employees;
  }
}

class UserInterface {
  #empLogic = null;
  constructor() {
    this.#empLogic = new EmployeeLogic();
  }

  // Access on Save Button
  save(operation, employee) {
    if (operation === "add") {
      this.#empLogic.addEmployee(employee);
      return;
    }
    if (operation === "update") {
      this.#empLogic.updateEmployee(employee.EmpNo, employee);
      return;
    }
    if (operation === "delete") {
      this.#empLogic.deleteEmployee(employee.EmpNo, employee);
      return;
    }
    // Call to addEmployee of  EmployeeLogic in case of new Entry
    // call to updateEmployee of EmployeeLogic in case of Update
    // call to deleteEmployee of EmployeeLogic in case of Delete
  }

  // Access this on the Text Change UI Events to search
  search() {
    // Call to various search methods opf EmployeeLogic class (Define your own UI)
    // make the UI Interactive
  }

  updateTable() {
    let employees = this.#empLogic.getEmployees();
    let table = document.getElementById("empTable");
    let rowCount = table.rows.length;
    for (let i = 1; i < rowCount; i++) {
      table.deleteRow(1);
    }
    for (let i = 0; i < employees.length; i++) {
      let row = table.insertRow(-1);

      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1);
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);
      let cell5 = row.insertCell(4);

      cell1.innerHTML = employees[i].EmpNo;
      cell2.innerHTML = employees[i].EmpName;
      cell3.innerHTML = employees[i].DeptName;
      cell4.innerHTML = employees[i].Designation;
      cell5.innerHTML = employees[i].Salary;
    }
  }
}

const UI = new UserInterface();

function saveEmployee(operation) {
  const emp = new Employee();
  emp.EmpNo = Number(document.getElementById("empNo").value);
  emp.EmpName = document.getElementById("empName").value;
  emp.DeptName = document.getElementById("deptName").value;
  emp.Designation = document.getElementById("designation").value;
  emp.Salary = Number(document.getElementById("salary").value);
  UI.save(operation, emp);
  UI.updateTable();
  document.getElementById("empNo").value = "";
  document.getElementById("empName").value = "";
  document.getElementById("deptName").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("salary").value = "";
}
