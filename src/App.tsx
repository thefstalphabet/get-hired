import { Route, Routes } from "react-router-dom";
import routes, { IRoutes } from "./lib/routes";
import NavigationBar from "./components/navigation-bar";

export default function App() {
  return (
    // my-16 grid gap-20 mx-auto px-5 w-[100%] lg:w-[70%] lg:px-0 md:max-w-6xl
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
