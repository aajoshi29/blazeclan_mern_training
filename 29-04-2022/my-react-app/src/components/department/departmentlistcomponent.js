import DepartmentService from "../../services/departmentservice";
import SearchComponent from "../searchcomponent";
import TableComponent from "../tablecomponent";

const { Fragment, useEffect, useState } = require("react");

const DepartmentListComponent = () => {
  const departmentService = new DepartmentService();
  const [departments, setDepartments] = useState([{}]);
  const [searchText, setSearchText] = useState("");

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

  return (
    <Fragment>
      <SearchComponent
        searchText={searchText}
        setSearchText={(event) => {
          return setSearchText(event.target.value);
        }}
        onSearch={handleSearch}
      ></SearchComponent>
      <TableComponent records={departments}></TableComponent>
    </Fragment>
  );
};

export default DepartmentListComponent;
