import axios from "axios";

class DepartmentService {
  constructor() {
    this.url = "http://localhost:7011";
    this.token =
      "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwidXNlclBlcm1pc3Npb25zIjpbIlJlYWQiLCJDcmVhdGUiLCJVcGRhdGUiXSwiaWF0IjoxNjUyMDg1MzI0LCJleHAiOjE2NTIwODg5MjR9.zmUZrx6JesaAiL1eVvl_i_06cKYddJqxP5MmhuoXKiV01T4-dVkfCV1XUjod8SpJ";
  }

  async getAllDepartments() {
    let response = await axios.get(`${this.url}/api/departments`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response;
  }

  async getDepartmentByName(deptName) {
    let response = await axios.get(`${this.url}/api/departments`, {
      params: { deptName: deptName },
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response;
  }

  async getDepartmentById(deptId) {
    let response = await axios.get(`${this.url}/api/departments/${deptId}`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Authorization: `Bearer ${this.token}`,
      },
    });
    return response;
  }

  async addDepartment(dept) {
    let response = await axios.post(`${this.url}/api/departments`, dept);
    return response;
  }

  async editDepartment(dept) {
    let response = await axios.put(
      `${this.url}/api/departments/${dept.id}`,
      dept
    );
    return response;
  }

  async deleteDepartment(deptId) {
    let response = await axios.delete(`${this.url}/api/departments/${deptId}`);
    return response;
  }
}

export default DepartmentService;
