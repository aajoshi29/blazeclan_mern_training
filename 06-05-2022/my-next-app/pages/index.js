import styles from "../styles/Home.module.css";
import NavigatorComponent from "./navigator";

export default function Home() {
  return (
    <div className={styles.container}>
      <NavigatorComponent></NavigatorComponent>
    </div>
  );
}
