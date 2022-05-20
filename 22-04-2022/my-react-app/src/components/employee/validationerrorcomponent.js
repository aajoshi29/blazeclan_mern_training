import { Fragment } from "react";

const ValidationErrorComponent = (props) => {
  return (
    <Fragment>
      <div className="alert alert-danger mt-2">{props.message}</div>
    </Fragment>
  );
};

export default ValidationErrorComponent;
