import { useSelector, useDispatch } from "react-redux";
import { selectDepartment } from "../actions/actions";

const ListDepartmentsComponent = () => {
  const departments = useSelector((state) => state.departmentReducer);
  const dispatch = useDispatch();

  const handleSelectDepartment = (department) => {
    dispatch(selectDepartment(department));
  };

  if (departments.length > 0) {
    return (
      <div className="container mt-4">
        <table className="table">
          <thead>
            <tr>
              {Object.keys(departments[0]).map((header, index) => (
                <th key={index + 1000}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {departments.map((record, ind) => (
              <tr key={ind} onClick={() => handleSelectDepartment(record)}>
                {Object.keys(departments[0]).map((header, index) => (
                  <td key={index}>{record[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default ListDepartmentsComponent;
