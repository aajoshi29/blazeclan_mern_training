import DepartmentService from "../../services/departmentservice";
import SearchComponent from "../searchcomponent";
import TableComponent from "../tablecomponent";
import { useNavigate } from "react-router-dom";

const { Fragment, useEffect, useState } = require("react");

const DepartmentListComponent = () => {
  const departmentService = new DepartmentService();
  const [departments, setDepartments] = useState([{}]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    departmentService
      .getAllDepartments()
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      departmentService
        .getAllDepartments()
        .then((response) => {
          setDepartments(response.data.data);
        })
        .catch((error) => {
          console.log(`Error Occurred ${error}`);
        });
    } else {
      departmentService
        .getDepartmentByName(searchText)
        .then((response) => {
          if (response.data.data.length === 0) {
            setDepartments([{}]);
            return;
          }
          setDepartments(response.data.data);
        })
        .catch((error) => {
          console.log(`Error Occurred ${error}`);
        });
    }
  };

  const handleAddDepartment = () => {
    navigate("/departments/add");
  };

  const handleDeleteDepartment = (deptId) => {
    departmentService
      .deleteDepartment(deptId)
      .then((response) => {
        setDepartments(response.data.data);
      })
      .catch((error) => {
        console.log(`Error Occurred ${error}`);
      });
  };

  const handleEditDepartment = (deptId) => {
    navigate(`/departments/edit/${deptId}`);
  };

  return (
    <Fragment>
      <div className="text-end mb-4">
        <button className="btn btn-primary" onClick={handleAddDepartment}>
          Add Department
        </button>
      </div>
      <SearchComponent
        searchText={searchText}
        setSearchText={(event) => {
          return setSearchText(event.target.value);
        }}
        onSearch={handleSearch}
      ></SearchComponent>
      <TableComponent
        records={departments}
        onDelete={handleDeleteDepartment}
        onEdit={handleEditDepartment}
      ></TableComponent>
    </Fragment>
  );
};

export default DepartmentListComponent;
