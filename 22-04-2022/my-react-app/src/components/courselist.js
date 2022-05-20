import { Fragment, useState } from "react";

const CourseList = () => {
  const [input, setInput] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [total, setTotal] = useState(0);

  const handleClear = () => {
    setInput("");
  };

  // [
  //   { courseName: "Java", courseFees: 100 },
  //   { courseName: "Python", courseFees: 200 },
  //   { courseName: "JavaScript", courseFees: 300 },
  // ];

  const handleResetList = () => {
    setCourseList([]);
    setTotal(0);
  };

  const handleInputChange = (value) => {
    setInput(value);
  };

  const handleGenerateList = () => {
    if (input.trim() === "") return;
    setCourseList((state) => {
      return [...state, ...JSON.parse(input)];
    });
    setInput("");
  };

  const handleCalculateTotal = (is_addition, value) => {
    if (is_addition) {
      setTotal(total + Number(value));
    } else {
      setTotal(total - Number(value));
    }
  };

  return (
    <Fragment>
      <div className="container mt-4 text-center">
        <h3>Course List</h3>
        <div className="form-group mt-4">
          <input
            className="form-control"
            value={input}
            onChange={(event) => handleInputChange(event.target.value)}
          ></input>
        </div>
        <button
          className="btn btn-primary mt-4 mb-4 me-4"
          onClick={handleGenerateList}
        >
          Generate List
        </button>
        <button
          className="btn btn-primary mt-4 mb-4 me-4"
          onClick={handleClear}
        >
          Clear
        </button>
        <button className="btn btn-primary mt-4 mb-4" onClick={handleResetList}>
          Reset List
        </button>
      </div>
      {courseList.length > 0 && (
        <div className="container mt-2 mb-4">
          {courseList.map((course, i) => {
            console.log(course);
            return (
              <Fragment key={i}>
                <input
                  type="checkbox"
                  value={course.courseFees}
                  onChange={(event) =>
                    handleCalculateTotal(
                      event.target.checked,
                      event.target.value
                    )
                  }
                />
                <label className="ms-2">
                  {course.courseName} - {course.courseFees}
                </label>
                <br />
              </Fragment>
            );
          })}
          <h5 className="mt-4">Total - {total}</h5>
        </div>
      )}
    </Fragment>
  );
};

export default CourseList;
