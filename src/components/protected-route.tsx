import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute(props: { children: any }) {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();

  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return navigate("/?sign-in=true");
  }
  return props?.children;
}
