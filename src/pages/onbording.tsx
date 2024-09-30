import { useUser } from "@clerk/clerk-react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Select } from "antd";

function Onbording() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSelectChanges = async (value: string) => {
    try {
      await user?.update({
        unsafeMetadata: { role: value },
      });
      navigate(value === "1" ? "/" : "/");
    } catch (error) {
      console.error("Error while selecting user type:", error);
    }
  };
  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(
        user?.unsafeMetadata?.role === "1" ? "/job-search" : "/job-search"
      );
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center gap-7 h-[70vh]">
      <h1 className="text-3xl font-bold">You are a...</h1>
      <Select
        className="w-60"
        defaultValue="lucy"
        onSelect={handleSelectChanges}
        options={[
          { value: "1", label: "Candidate" },
          { value: "2", label: "Recruiter" },
        ]}
      />
    </div>
  );
}

export default Onbording;
