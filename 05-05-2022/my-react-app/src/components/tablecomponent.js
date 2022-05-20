const TableComponent = (props) => {
  const headers = Object.keys(props.records[0]);

  const handleDelete = (id) => {
    props.onDelete(parseInt(id));
  };

  const handleEdit = (id) => {
    props.onEdit(parseInt(id));
  };

  if (headers.length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index + 1000}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.records.map((record, ind) => (
            <tr key={ind}>
              {headers.map((header, index) => (
                <td key={index}>{record[header]}</td>
              ))}
              <td>
                <button
                  className="btn btn-warning me-4"
                  onClick={() => handleEdit(record["id"])}
                >
                  Edit
                </button>
                <button
                  className="btn btn-dark"
                  onClick={() => handleDelete(record["id"])}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="container">
      <p className="text-center">No records found.</p>
    </div>
  );
};

export default TableComponent;
