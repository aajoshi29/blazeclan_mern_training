import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDepartment } from "../actions/actions";

const CreateDepartmentComponent = (props) => {
  let [department, setDepartment] = useState({
    deptno: 0,
    deptname: "",
    location: "",
    capacity: 5,
  });

  const locations = [
    "Pune",
    "Mumbai",
    "Kolhapur",
    "Nagpur",
    "Nashik",
    "Satara",
    "Thane",
  ];
  const capacities = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ];

  const dispatch = useDispatch();

  const _dept = useSelector((state) => state.selectDepartmentReducer);

  const handleSave = () => {
    dispatch(addDepartment(department));
  };

  useEffect(() => {
    setDepartment(_dept);
  }, [_dept]);

  const handleClear = () => {
    setDepartment({
      deptno: 0,
      deptname: "",
      location: "",
      capacity: 5,
    });
  };

  return (
    <Fragment>
      <div className="form-group mt-2">
        <label>Department Number</label>
        <input
          type="number"
          value={department.deptno}
          onChange={(evt) =>
            setDepartment({ ...department, deptno: parseInt(evt.target.value) })
          }
          className="form-control"
        />
      </div>
      <div className="form-group mt-2">
        <label>Department Name</label>
        <input
          type="text"
          value={department.deptname}
          onChange={(evt) =>
            setDepartment({ ...department, deptname: evt.target.value })
          }
          className="form-control"
        />
      </div>
      <div className="form-group mt-2">
        <label>Location</label>
        <select
          value={department.location}
          onChange={(evt) =>
            setDepartment({ ...department, location: evt.target.value })
          }
          className="form-control"
        >
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group mt-2">
        <label>Capacity</label>
        <select
          value={department.capacity}
          onChange={(evt) =>
            setDepartment({
              ...department,
              capacity: parseInt(evt.target.value),
            })
          }
          className="form-control"
        >
          {capacities.map((capacity, index) => (
            <option key={index + 100}>{capacity}</option>
          ))}
        </select>
      </div>
      <div className="form-group mt-4">
        <input
          type="button"
          className="btn btn-success"
          value="Save"
          onClick={handleSave}
        />
        <input
          type="button"
          className="btn btn-danger ms-2"
          value="Clear"
          onClick={handleClear}
        />
      </div>
    </Fragment>
  );
};

export default CreateDepartmentComponent;
