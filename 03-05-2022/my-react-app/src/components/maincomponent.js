// import { useDispatch, useSelector } from "react-redux";
import CreateDepartmentComponent from "./createdepartmentcomponent";
import ListDepartmentsComponent from "./listdepartmentcomponent";

const MainComponent = () => {
  //   let dispatch = useDispatch();

  return (
    <div className="container mt-4">
      <CreateDepartmentComponent></CreateDepartmentComponent>
      <ListDepartmentsComponent></ListDepartmentsComponent>
    </div>
  );
};

export default MainComponent;
