const SearchComponent = (props) => {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Enter department name"
        value={props.searchText}
        onChange={props.setSearchText}
      />
      <button className="btn btn-primary mt-2" onClick={props.onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
