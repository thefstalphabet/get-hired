import { GoArrowUpLeft } from "react-icons/go";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="grid justify-center gap-4 mt-60">
      <h1 className="text-3xl">Page Not Found!</h1>
      <Link className="text-xl flex items-center " to="/">
        <GoArrowUpLeft />
        Back
      </Link>
    </div>
  );
}
