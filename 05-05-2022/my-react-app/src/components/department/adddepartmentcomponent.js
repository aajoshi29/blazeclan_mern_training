import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentService from "../../services/departmentservice";

const AddDepartmentComponent = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState({
    name: "",
    location: "",
    capacity: "",
  });
  const departmentService = new DepartmentService();

  const handleChange = (event) => {
    if (event.target.name === "deptName") {
      setDepartment((state) => ({ ...state, name: event.target.value }));
    }
    if (event.target.name === "location") {
      setDepartment((state) => ({ ...state, location: event.target.value }));
    }
    if (event.target.name === "capacity") {
      setDepartment((state) => ({
        ...state,
        capacity: parseInt(event.target.value),
      }));
    }
  };

  const handleSave = () => {
    departmentService
      .addDepartment(department)
      .then((response) => {
        console.log(response.data.data);
        navigate("/departments");
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  return (
    <div className="container mt-2">
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          className="form-control"
          value={department.name}
          onChange={handleChange}
          name="deptName"
        />
      </div>
      <div className="form-group mt-2">
        <label>Location:</label>
        <input
          type="text"
          className="form-control"
          value={department.location}
          onChange={handleChange}
          name="location"
        />
      </div>
      <div className="form-group mt-2  mb-4">
        <label>Capacity:</label>
        <input
          type="number"
          className="form-control"
          value={department.capacity}
          onChange={handleChange}
          name="capacity"
        />
      </div>
      <div className="form-group me-2 d-inline">
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>
      </div>
      <div className="form-group d-inline">
        <button
          className="btn btn-danger"
          onClick={() => navigate("/departments")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddDepartmentComponent;
