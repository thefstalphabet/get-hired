import { useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute(props: { children: any }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return navigate("/?sign-in=true");
  }
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname !== "/onbording"
  ) {
    return navigate("/onbording");
  }
  return props?.children;
}
