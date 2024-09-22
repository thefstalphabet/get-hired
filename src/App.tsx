import { Route, Routes } from "react-router-dom";
import routes, { IRoutes } from "./lib/routes";
import NavigationBar from "./components/navigation-bar";
import Footer from "./components/footer";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        {routes.map((route: IRoutes) => {
          const { path, element } = route;
          return <Route key={path} element={element} path={path} />;
        })}
      </Routes>
    </div>
  );
}
