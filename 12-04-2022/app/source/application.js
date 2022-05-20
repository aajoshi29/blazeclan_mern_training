class Employee {
  constructor(EmpNo, EmpName, DeptName) {
    this.EmpNo = EmpNo;
    this.EmpName = EmpName;
    this.DeptName = DeptName;
  }
}

function getEmployees() {
  let response = fetch("http://127.0.0.1:8000", {
    method: "GET",
    headers: {
      id: 2,
    },
  });
  return response;
}

function getEmployeeByEmpNo(empNo) {
  let response = fetch("http://localhost:7013/" + empNo, {
    method: "GET",
    headers: {
      Authorization: "abc@gmail.com:Abc@123",
    },
  });
  return response;
}

function addEmployee(employee) {
  let response = fetch("http://localhost:7013/", {
    method: "POST",
    body: JSON.stringify(employee),
    headers: {
      "Content-Type": "application/json",
      Authorization: "abc@gmail.com:Abc@123",
    },
  });
  return response;
}

function editEmployee(employee) {
  let response = fetch("http://localhost:7013/" + employee.EmpNo, {
    method: "PUT",
    body: JSON.stringify(employee),
    headers: {
      "Content-Type": "application/json",
      Authorization: "abc@gmail.com:Abc@123",
    },
  });
  return response;
}

function removeEmployee(empNo) {
  let response = fetch("http://localhost:7013/" + empNo, {
    method: "DELETE",
  });
  return response;
}

function saveEmployee() {
  const employee = new Employee(
    Number(document.getElementById("empNo").value),
    document.getElementById("empName").value,
    document.getElementById("deptName").value
  );
  let result = addEmployee(employee);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
  resetInputs();
}

function updateProduct() {
  const employee = new Employee(
    Number(document.getElementById("empNo").value),
    document.getElementById("empName").value,
    document.getElementById("deptName").value
  );
  let result = editEmployee(employee);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
  resetInputs();
}

function deleteEmployee(empNo) {
  let result = removeEmployee(empNo);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
}

function loadEmployee(empNo) {
  let result = getEmployeeByEmpNo(empNo);
  result
    .then((resp) => resp.json())
    .then((data) => updateInputs(data))
    .catch((error) => console.log(error));
}

window.onload = function loadEmployees() {
  let result = getEmployees();
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data))
    .catch((error) => console.log(error));
};

function updateTable(emps) {
  let table = document.getElementById("empTable");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
  for (let i = 0; i < emps.length; i++) {
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = emps[i].EmpNo;
    cell2.innerHTML = emps[i].EmpName;
    cell3.innerHTML = emps[i].DeptName;
    cell4.innerHTML = `<button class="btn btn-danger" onclick="deleteEmployee(${emps[i].EmpNo})">Delete</button>`;
    cell5.innerHTML = `<button class="btn btn-success" onclick="loadEmployee(${emps[i].EmpNo})">Load</button>`;
  }
}

function updateInputs(product) {
  document.getElementById("productRowId").value = product.ProductRowId;
  document.getElementById("productId").value = product.ProductId;
  document.getElementById("productName").value = product.ProductName;
  document.getElementById("description").value = product.Description;
  setDropdown(document.getElementById("categoryName"), product.CategoryName);
  setDropdown(
    document.getElementById("manufacturerName"),
    product.Manufacturer
  );
  document.getElementById("price").value = product.BasePrice;
}

function setDropdown(id, val) {
  let dropdown = id;
  for (let i = 0; i < dropdown.options.length; i++) {
    if (dropdown.options[i].text === val) {
      dropdown.selectedIndex = i;
      break;
    }
  }
}

function resetInputs() {
  document.getElementById("empNo").value = "";
  document.getElementById("empName").value = "";
  resetDropdown(document.getElementById("deptName"));
}

function resetDropdown(dropdown) {
  dropdown.selectedIndex = 0;
}
