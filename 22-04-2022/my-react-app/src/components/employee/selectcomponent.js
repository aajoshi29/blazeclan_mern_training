import { SelectDataContext } from "../../context/selectdatacontext";
import { useContext } from "react";

const SelectComponent = () => {
  let dataSource = useContext(SelectDataContext);

  return (
    <div className="form-group mt-2">
      <label>{dataSource.label}</label>
      <select
        className="form-control"
        multiple={dataSource.isMultiSelect}
        name={dataSource.name}
        onChange={dataSource.onSelect}
      >
        {dataSource.options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
