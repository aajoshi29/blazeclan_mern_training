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

import DataAccess from "./dataaccess/dataaccess.js";

let ds = new DataAccess();

instance.get("/api/departments", ds.getAllDepartments);
instance.get("/api/departments/:id", ds.getDepartmentById);
instance.post("/api/departments", ds.addDepartment);
instance.put("/api/departments/:id", ds.updateDepartment);
instance.delete("/api/departments/:id", ds.deleteDepartment);
instance.get("/api/employees", ds.getEmployees);
instance.get("/api/employees/:id", ds.getEmployeeById);
instance.post("/api/employees", ds.addEmployee);
instance.put("/api/employees/:id", ds.updateEmployee);
instance.delete("/api/employees/:id", ds.deleteEmployee);
instance.post("/api/login", ds.login);
instance.post("/api/register", ds.register);

instance.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
