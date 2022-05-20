const TableComponent = (props) => {
  const headers = Object.keys(props.records[0]);

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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
