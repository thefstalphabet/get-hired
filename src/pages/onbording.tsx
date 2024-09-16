import { useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Onbording() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSelectChanges = async (value: string) => {
    try {
      await user?.update({
        unsafeMetadata: { role: value },
      });
      navigate(value === "1" ? "/dashboard" : "/post-jobs");
    } catch (error) {
      console.error("Error while selecting user type:", error);
    }
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "1" ? "/dashboard" : "/post-jobs"
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-7 h-[70vh]">
      <h1 className="text-3xl font-bold">You are a...</h1>
      <Select
        onValueChange={(value: string) => {
          handleSelectChanges(value);
        }}
      >
        <SelectTrigger className="w-[350px]">
          <SelectValue placeholder="Select user type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Candidate</SelectItem>
          <SelectItem value="2">Recruiter</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default Onbording;
