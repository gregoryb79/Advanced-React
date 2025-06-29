
import styles from "./App.module.scss";
import { Outlet} from "react-router";
import { Home } from "./pages/Home";

export function App() {  

  return (
     <>      
      {/* <Nav/>      
      <Outlet/> */}
      <Home/>
    </>
  );
}

function Nav() { 

  console.log("Nav component rendered");

  return (
    <nav className={styles.nav}>      
      <h2>Advanced React</h2>
    </nav>
  );
}
