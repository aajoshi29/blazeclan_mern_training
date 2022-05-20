import axios from "axios";

class LoginService {
  constructor() {
    this.url = "http://localhost:7011";
  }

  async login(user) {
    let response = await axios.post(`${this.url}/api/login`, user);
    return response;
  }
}

export default LoginService;
