import Link from "next/link";

const NavigatorComponent = () => {
  return (
    <div className="container mb-4 mt-4">
      <div className="btn btn-dark me-4">
        <Link href="/employees/list">Employees</Link>
      </div>
      <div className="btn btn-dark me-4">
        <Link href="/departments/list">Departments</Link>
      </div>
    </div>
  );
};

export default NavigatorComponent;
