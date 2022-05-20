import { Sequelize } from "sequelize";
import pkg from "sequelize";
const { DataTypes } = pkg;
import department from "./../models/department.js";
import employee from "./../models/employee.js";
import { Op } from "sequelize";
import user from "./../models/user.js";
import jsonwebtoken from "jsonwebtoken";

const sequelize = new Sequelize("enterprise", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

sequelize.authenticate().then(
  (authenticate) => {
    console.log(`Connected to DB Successfully.... ${authenticate}`);
  },
  (error) => {
    console.log(`failed....${error}`);
  }
);

const jwtSettings = {
  jwtSecret: "mysecret",
};

const user_permission_mapping = [
  {
    username: "aditya",
    permissions: ["Create", "Read", "Update", "Delete"],
  },
  {
    username: "chris",
    permissions: ["Read"],
  },
  {
    username: "david",
    permissions: ["Read", "Create", "Update"],
  },
  {
    username: "eve",
    permissions: ["Create", "Update"],
  },
  {
    username: "farhan",
    permissions: ["Create"],
  },
];

class DataAccess {
  constructor() {
    department.init(sequelize, DataTypes);
    employee.init(sequelize, DataTypes);
    user.init(sequelize, DataTypes);
  }

  async getAllDepartments(req, resp) {
    if (!req.headers.authorization) {
      return resp
        .status(400)
        .send({ message: "Authorization header is missing" });
    }
    let auth_header = req.headers.authorization;
    let receivedToken = auth_header.split(" ")[1];
    jsonwebtoken.verify(
      receivedToken,
      jwtSettings.jwtSecret,
      async (error, decode) => {
        if (error) {
          return resp.status(401).send({ message: "Unauthorized" });
        }
        if (decode.userPermissions.includes("Read")) {
          await sequelize.sync({ force: false });
          if (req.query.deptName) {
            let records = await department.findAll({
              where: { name: req.query.deptName },
            });
            if (records) {
              return resp
                .status(200)
                .send({ message: "Data is read successfully", data: records });
            }
          } else {
            let records = await department.findAll({ order: [["id", "ASC"]] });
            if (records) {
              return resp
                .status(200)
                .send({ message: "Data is read successfully", data: records });
            }
          }
          return resp
            .status(500)
            .send({ message: "Error Occured while reading data" });
        }
        return resp
          .status(403)
          .send({ message: "User doesn't have enough permissions" });
      }
    );
  }

  async getDepartmentById(req, resp) {
    await sequelize.sync({ force: false });
    let id = parseInt(req.params.id);
    let record = await department.findOne({ where: { id: id } });
    if (record) {
      return resp
        .status(200)
        .send({ message: "Data is read successfully", data: record });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while reading data" });
  }

  async addDepartment(req, resp) {
    await sequelize.sync({ force: false });
    let dept = req.body;
    let record = await department.create(dept);
    if (record) {
      let records = await department.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is added successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while adding data" });
  }

  async updateDepartment(req, resp) {
    await sequelize.sync({ force: false });
    let dept = req.body;
    let deptid = parseInt(req.params.id);
    let record = await department.update(
      {
        name: dept.deptname,
        location: dept.location,
        capacity: dept.capacity,
      },
      { where: { id: deptid } }
    );
    if (record) {
      let records = await department.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is upadated successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while updating data" });
  }

  async deleteDepartment(req, resp) {
    await sequelize.sync({ force: false });
    let deptid = parseInt(req.params.id);
    let record = await department.destroy({ where: { id: deptid } });
    if (record) {
      let records = await department.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is deleted successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while deleting data" });
  }

  async getEmployees(req, resp) {
    await sequelize.sync({ force: false });
    let records;
    if (req.query.empName && req.query.deptName && req.query.op) {
      const dept = await department.findOne({
        where: {
          name: req.query.deptName,
        },
      });
      if (req.query.op === "AND") {
        records = await employee.findAll({
          where: {
            name: req.query.empName,
            dept_id: dept.id,
          },
        });
      } else if (req.query.op === "OR") {
        records = await employee.findAll({
          where: {
            [Op.or]: [{ name: req.query.empName }, { dept_id: dept.id }],
          },
        });
      }
    } else {
      records = await employee.findAll({ order: [["id", "ASC"]] });
    }

    if (records) {
      return resp
        .status(200)
        .send({ message: "Data is read successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while reading data" });
  }

  async getEmployeeById(req, resp) {
    await sequelize.sync({ force: false });
    let id = parseInt(req.params.id);
    let record = await employee.findOne({ where: { id: id } });
    if (record) {
      return resp
        .status(200)
        .send({ message: "Data is read successfully", data: record });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while reading data" });
  }

  async addEmployee(req, resp) {
    await sequelize.sync({ force: false });
    let emp = req.body;
    let record = await employee.create(emp);
    if (record) {
      let records = await employee.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is added successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while adding data" });
  }

  async updateEmployee(req, resp) {
    await sequelize.sync({ force: false });
    let emp = req.body;
    let empId = parseInt(req.params.id);
    let record = await employee.update(
      {
        name: emp.name,
        designation: emp.designation,
        salary: emp.salary,
        dept_id: emp.dept_id,
      },
      { where: { id: empId } }
    );
    if (record) {
      let records = await employee.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is upadated successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while updating data" });
  }

  async deleteEmployee(req, resp) {
    await sequelize.sync({ force: false });
    let empId = parseInt(req.params.id);
    let record = await employee.destroy({ where: { id: empId } });
    if (record) {
      let records = await employee.findAll({ order: [["id", "ASC"]] });
      return resp
        .status(200)
        .send({ message: "Data is deleted successfully", data: records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while deleting data" });
  }

  async addDeptAndEmployees(req, resp) {
    await sequelize.sync({ force: false });
    let request_body = req.body;
    let dept_record = await department.create(request_body.department);
    let emp_records;
    if (dept_record) {
      const employees = request_body.employees.map((obj) => ({
        ...obj,
        dept_id: dept_record.id,
      }));
      emp_records = await employee.bulkCreate(employees);
    }

    if (emp_records) {
      return resp
        .status(200)
        .send({ message: "Data is added successfully", data: emp_records });
    }
    return resp
      .status(500)
      .send({ message: "Error Occured while adding data" });
  }

  async login(req, resp) {
    await sequelize.sync({ force: false });
    let { username, password } = req.body;
    if (!username || !password) {
      return resp
        .status(400)
        .send({ message: "Username and Password fields are required" });
    }
    const user_record = await user.findOne({ where: { username: username } });
    if (!user_record) {
      return resp
        .status(401)
        .send({ message: "User with specified username doesn't exist" });
    }
    if (user_record.password !== password)
      return resp.status(401).send({ message: "Invalid password" });

    const userPermissions = user_permission_mapping.filter(
      (up) => username === up.username
    )[0].permissions;

    console.log(userPermissions);

    const token = jsonwebtoken.sign(
      { username, userPermissions },
      jwtSettings.jwtSecret,
      {
        expiresIn: 3600,
        algorithm: "HS384",
      }
    );

    return resp
      .status(200)
      .send({ message: "User authenticated successfully", token: token });
  }

  async register(req, resp) {
    await sequelize.sync({ force: false });
    let { username, password } = req.body;
    if (!username || !password) {
      return resp
        .status(400)
        .send({ message: "Username and Password fields are required" });
    }
    const user_record = await user.findOne({ where: { username: username } });
    if (!user_record) {
      const record = await user.create(req.body);
      return resp
        .status(201)
        .send({ message: "User added successfully", user_id: record.id });
    }
    return resp.status(400).send({
      message: "User with specified username already exists",
    });
  }
}

export default DataAccess;
