import axios from "axios";

class EmployeeService {
  constructor() {
    this.url = "http://localhost:7011";
  }

  async getAllEmployees() {
    let response = await axios.get(`${this.url}/api/employees`);
    return response;
  }

  async getEmployeeById(empId) {
    let response = await axios.get(`${this.url}/api/employees/${empId}`);
    return response;
  }

  async addEmployee(emp) {
    let response = await axios.post(`${this.url}/api/employees`, emp);
    return response;
  }

  async editEmployee(emp) {
    let response = await axios.put(`${this.url}/api/employees/${emp.id}`, emp);
    return response;
  }

  async deleteEmployee(empId) {
    let response = await axios.delete(`${this.url}/api/employees/${empId}`);
    return response;
  }
}

export default EmployeeService;
