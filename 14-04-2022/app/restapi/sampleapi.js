import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 7011;

const instance = express();

instance.use(express.json());

instance.use(express.urlencoded({ extended: false }));

instance.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

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

instance.get("/api/employees", (req, resp) => {
  if (req.query.EmpName && req.query.DeptName && req.query.op) {
    let filteredEmployees;
    if (req.query.op === "AND") {
      filteredEmployees = Employees.filter(
        (empl) =>
          empl.EmpName === req.query.EmpName &&
          empl.DeptName === req.query.DeptName
      );
    } else if (req.query.op === "OR") {
      filteredEmployees = Employees.filter(
        (empl) =>
          empl.EmpName === req.query.EmpName ||
          empl.DeptName === req.query.DeptName
      );
    }
    resp.status(200).send({
      message: "Data Search is Successful",
      data: filteredEmployees,
    });
    return;
  }
  resp.status(200).send({
    message: "Data Reading is Successful",
    data: Employees,
  });
});

instance.get("/api/employees/:id", (req, resp) => {
  let id = parseInt(req.params.id);
  console.log(id);
  if (id === 0) {
    resp.status(500).send({
      message: "Invalid Parameter Value",
    });
  } else {
    let emp = Employees.find((e, i) => {
      return e.EmpNo === id;
    });
    console.log(JSON.stringify(emp));
    resp.status(200).send({
      message: "Data Reading is Successful",
      data: emp,
    });
  }
});

instance.post("/api/employees", (req, resp) => {
  let emp = req.body;
  console.log(`Received data = ${JSON.stringify(emp)}`);
  Employees.push(emp);
  resp.status(200).send({
    message: "Data Reading is Successful",
    data: JSON.stringify(Employees),
  });
});

instance.put("/api/employees/:id", (req, resp) => {
  let emp = req.body;
  console.log(`Received data = ${JSON.stringify(emp)}`);
  Employees = Employees.filter((empl) => empl.EmpNo !== emp.EmpNo);
  Employees.push(emp);
  resp.status(200).send({
    message: "Data Update is Successful",
    data: JSON.stringify(Employees),
  });
});

instance.delete("/api/employees/:id", (req, resp) => {
  Employees = Employees.filter(
    (empl) => empl.EmpNo !== parseInt(req.params.id)
  );
  resp.status(200).send({
    message: "Data Delete is Successful",
    data: JSON.stringify(Employees),
  });
});

instance.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
