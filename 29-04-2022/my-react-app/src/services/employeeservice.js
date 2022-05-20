import axios from "axios";

class EmployeeService {
  constructor() {
    this.url = "http://localhost:7011";
  }

  async getAllEmployees() {
    let response = await axios.get(`${this.url}/api/employees`);
    return response;
  }
}

export default EmployeeService;
