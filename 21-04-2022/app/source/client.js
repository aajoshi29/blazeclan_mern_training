import express from "express";
import cors from "cors";

const PORT = process.env.PORT || 7012;

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

import DataAccess from "./dataaccess.js";

let obj = new DataAccess();

const serverOptions = {
  host: "localhost",
  port: 7011,
  path: "/api/employees",
  method: "GET",
};

function getEmployees(req, resp) {
  obj
    .getData(serverOptions)
    .then((response) => {
      console.log(`Received Response = ${response}`);
    })
    .catch((error) => {
      console.log(`Error Occurred ${error}`);
    });
}

instance.get("/api/employees", getEmployees);

instance.listen(PORT, () => {
  console.log(`Started on port ${PORT}`);
});
