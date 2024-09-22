import { Route, Routes } from "react-router-dom";
import routes, { IRoutes } from "./lib/routes";
import NavigationBar from "./components/navigation-bar";

export default function App() {
  return (
    <div className="hide-scrollbar">
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
