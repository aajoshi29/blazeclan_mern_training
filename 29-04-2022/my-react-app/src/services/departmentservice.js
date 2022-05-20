import axios from "axios";

class DepartmentService {
  constructor() {
    this.url = "http://localhost:7011";
  }

  async getAllDepartments() {
    let response = await axios.get(`${this.url}/api/departments`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwidXNlclBlcm1pc3Npb25zIjpbIlJlYWQiLCJDcmVhdGUiLCJVcGRhdGUiXSwiaWF0IjoxNjUxMTQ2NzY1LCJleHAiOjE2NTExNTAzNjV9.dYl4pkhl8lG9Gliet52RdlJdaf1v6-VU3HNye1F7LWpzW2yri-YDkDpelLscvxoD",
      },
    });
    return response;
  }

  async getDepartmentByName(deptName) {
    let response = await axios.get(`${this.url}/api/departments`, {
      params: { deptName: deptName },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhdmlkIiwidXNlclBlcm1pc3Npb25zIjpbIlJlYWQiLCJDcmVhdGUiLCJVcGRhdGUiXSwiaWF0IjoxNjUxMTQ2NzY1LCJleHAiOjE2NTExNTAzNjV9.dYl4pkhl8lG9Gliet52RdlJdaf1v6-VU3HNye1F7LWpzW2yri-YDkDpelLscvxoD",
      },
    });
    return response;
  }
}

export default DepartmentService;
