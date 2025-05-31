import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes, { IRoutes } from "./lib/routes";
import NavigationBar from "./components/navigation-bar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isSignedIn, user } = useUser();
  const [newRoutes, setNewRoutes] = useState<IRoutes[]>([]);
  useEffect(() => {
    if (isSignedIn) {
      setNewRoutes(routes); 
      if (!user?.unsafeMetadata?.role) {
        return navigate("/onbording");
      } else {
        if(pathname === "/onbording") {
          return navigate("/");
        }
      }
    } else {
      setNewRoutes(routes.filter((route: IRoutes) => !route.auth));
    }
  }, [isSignedIn]);

  return (
    <div className="hide-scrollbar">
      <NavigationBar />
      <Routes>
        {newRoutes.map((route: IRoutes) => {
          const { path, element } = route;
          return <Route key={path} element={element} path={path} />;
        })}
      </Routes>
    </div>
  );
}
