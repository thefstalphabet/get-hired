import ProtectedRoute from "../components/protected-route";
import Dashboard from "../pages/dashboard";
import Home from "../pages/home";
import JobSearch from "../pages/job-search";
import Onbording from "../pages/onbording";
import PageNotFound from "../pages/page-not-found";

export interface IRoutes {
  path: string;
  element: JSX.Element;
}
const routes: Array<IRoutes> = [
  {
    path: "*",
    element: <PageNotFound/>,
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
    element: <PageNotFound/>,
  },
  {
    path: "/bookmarks",
    element: <PageNotFound/>,
  },
  {
    path: "/onbording",
    element: <Onbording />,
  },
  {
    path: "/job-search",
    element: <JobSearch />,
  },
];

export default routes;
