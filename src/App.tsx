import { Outlet } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout";

function App() {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
}

export default App;
