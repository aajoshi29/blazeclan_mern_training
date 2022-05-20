class Department {
  constructor(name, location, capacity) {
    this.name = name;
    this.location = location;
    this.capacity = capacity;
  }
}

let departmentId = -1;

function getDepartments() {
  let response = fetch("http://localhost:7011/api/departments", {
    method: "GET",
  });
  return response;
}

function getDepartmentByDeptId(deptId) {
  let response = fetch("http://localhost:7011/api/departments/" + deptId, {
    method: "GET",
  });
  return response;
}

function addDepartment(department) {
  let response = fetch("http://localhost:7011/api/departments/", {
    method: "POST",
    body: JSON.stringify(department),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

function editDepartment(departmentId, department) {
  let response = fetch(
    "http://localhost:7011/api/departments/" + departmentId,
    {
      method: "PUT",
      body: JSON.stringify(department),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}

function removeDepartment(deptId) {
  let response = fetch("http://localhost:7011/api/departments/" + deptId, {
    method: "DELETE",
  });
  return response;
}

function saveDepartment() {
  const department = new Department(
    document.getElementById("deptName").value,
    document.getElementById("location").value,
    Number(document.getElementById("capacity").value)
  );
  let result = addDepartment(department);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data.data))
    .catch((error) => console.log(error));
  resetInputs();
}

function updateDepartment() {
  const department = new Department(
    document.getElementById("deptName").value,
    document.getElementById("location").value,
    Number(document.getElementById("capacity").value)
  );
  let result = editDepartment(departmentId, department);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data.data))
    .catch((error) => console.log(error));
  resetInputs();
}

function deleteDepartment(deptId) {
  let result = removeDepartment(deptId);
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data.data))
    .catch((error) => console.log(error));
}

function loadDepartment(deptId) {
  departmentId = deptId;
  let result = getDepartmentByDeptId(deptId);
  result
    .then((resp) => resp.json())
    .then((data) => updateInputs(data.data))
    .catch((error) => console.log(error));
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

window.addEventListener("load", function () {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
  }

  let result = getDepartments();
  result
    .then((resp) => resp.json())
    .then((data) => updateTable(data.data))
    .catch((error) => console.log(error));
});

function updateTable(departments) {
  let table = document.getElementById("deptTable");
  let rowCount = table.rows.length;
  for (let i = 1; i < rowCount; i++) {
    table.deleteRow(1);
  }
  for (let i = 0; i < departments.length; i++) {
    let row = table.insertRow(-1);

    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = departments[i].name;
    cell2.innerHTML = departments[i].location;
    cell3.innerHTML = departments[i].capacity;
    cell4.innerHTML = `<button class="btn btn-danger" onclick="deleteDepartment(${departments[i].id})">Delete</button>`;
    cell5.innerHTML = `<button class="btn btn-success" onclick="loadDepartment(${departments[i].id})">Load</button>`;
  }
}

function updateInputs(department) {
  document.getElementById("deptName").value = department.name;
  document.getElementById("location").value = department.location;
  document.getElementById("capacity").value = department.capacity;
}

function resetInputs() {
  document.getElementById("deptName").value = "";
  document.getElementById("location").value = "";
  document.getElementById("capacity").value = "";
}
