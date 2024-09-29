import Home from "../pages/home";
import JobSearch from "../pages/job-search";
import Onbording from "../pages/onbording";
import PageNotFound from "../pages/page-not-found";

export interface IRoutes {
  path: string;
  element: JSX.Element;
  auth?: boolean;
}
const routes: Array<IRoutes> = [
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/onbording",
    element: <Onbording />,
    auth: true,
  },
  {
    path: "/job-search",
    element: <JobSearch />,
    auth: true,
  },
];

export default routes;
