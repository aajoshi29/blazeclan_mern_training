import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Fragment>
      <div className="container mt-4">
        <Link to="/departments" className="me-4">
          Department
        </Link>
        <Link to="/employees" className="me-4">
          Employee
        </Link>
        <div className="text-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="container mt-4">
        <Outlet />
      </div>
    </Fragment>
  );
};

export default HomeComponent;
