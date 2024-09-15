import ProtectedRoute from "../components/protected-route";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";

export interface IRoutes {
  path: string;
  element: JSX.Element;
}
const routes: Array<IRoutes> = [
  {
    path: "*",
    element: <>Something</>,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/applications-status",
    element: <ProtectedRoute>/applications-status</ProtectedRoute>,
  },
  {
    path: "/bookmarks",
    element: <ProtectedRoute>/bookmarks</ProtectedRoute>,
  },
];

export default routes;
