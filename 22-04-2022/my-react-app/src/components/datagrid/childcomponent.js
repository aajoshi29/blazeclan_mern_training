import { Fragment, useState } from "react";

const ChildComponent = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const headers = Object.keys(props.employees[0]);

  const handleDeleteEmployee = (event) => {
    props.onDelete(event.target.value);
  };

  const handleEditEmployee = (event) => {
    setIsEditable(!isEditable);
    console.log(event);
  };
  return (
    <div className="text-center">
      <h3>Data Grid</h3>
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index + 1000}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.employees.map((employee, ind) => (
            <tr key={ind}>
              {headers.map((header, index) => (
                <td key={index + employee.empId} contentEditable={isEditable}>
                  {employee[header]}
                </td>
              ))}
              {(props.canEdit || props.canDelete) && (
                <td>
                  {props.canEdit && (
                    <button
                      className="btn btn-primary"
                      onClick={handleEditEmployee}
                      value={employee.empId}
                    >
                      {!isEditable && "Edit"}
                      {isEditable && "Update"}
                    </button>
                  )}
                  {props.canDelete && (
                    <button
                      className="btn btn-danger ms-4"
                      onClick={handleDeleteEmployee}
                      value={employee.empId}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChildComponent;
