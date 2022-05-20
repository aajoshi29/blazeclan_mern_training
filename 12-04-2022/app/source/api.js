import http from "http";

let Employees = [
  { EmpNo: 1, EmpName: "A", DeptName: "D1" },
  { EmpNo: 2, EmpName: "B", DeptName: "D2" },
  { EmpNo: 3, EmpName: "C", DeptName: "D1" },
  { EmpNo: 4, EmpName: "D", DeptName: "D2" },
  { EmpNo: 5, EmpName: "E", DeptName: "D1" },
  { EmpNo: 6, EmpName: "F", DeptName: "D2" },
  { EmpNo: 7, EmpName: "G", DeptName: "D1" },
  { EmpNo: 8, EmpName: "H", DeptName: "D2" },
];

let users = [
  {
    username: "abc@gmail.com",
    password: "Abc@123",
  },
  {
    username: "def@gmail.com",
    password: "dEf@456",
  },
];

let server = http.createServer((request, response) => {
  // const [username, password] = request.headers.authorization.split(":");
  // const index = users.findIndex((user) => user.username === username);

  // if (index > -1 && users[index].password === password) {
  let id = parseInt(request.headers.id);
  if (request.method === "GET") {
    if (id === 0) {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(Employees));
      response.end();
    } else {
      console.log(id);
      let emp = Employees.find((e) => {
        return e.EmpNo === id;
      });
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(emp));
      response.end();
    }
  }

  if (request.method === "POST") {
    let receivedData;
    request.on("data", (chunk) => {
      receivedData = JSON.parse(chunk);
    });
    request.on("end", () => {
      Employees.push(receivedData);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(Employees));
      response.end();
    });
  }

  if (request.method === "PUT") {
    // Search record based on header, if found update it in array and return the modified array
    // if not found return Not Found Error Message
  }

  if (request.method === "DELETE") {
    // Search record based on header, if found delete it from array and return the modified array
    // if not found return Not Found Error Message
  }
  // }
  // else {
  //   const error_message = { error: "Invalid username or password." };
  //   response.writeHead(401, { "Content-Type": "application/json" });
  //   response.write(JSON.stringify(error_message));
  //   response.end();
  // }
});

server.listen(8000);
console.log("Server Started on port 8000");
