import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ReCard from "../reusable-antd-components/ReCard";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";

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
      <h1 className="text-3xl font-bold">Select yout role</h1>
      <div className="flex gap-4">
        <ReCard
          className="px-16 py-10 cursor-pointer hover:border-[#691F74]"
          onClick={() => {
            handleSelectChanges("1");
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <FaUserGraduate className="text-4xl" />
            <p className="text-base">Candidate</p>
          </div>
        </ReCard>
        <ReCard
          className="px-16 py-10 cursor-pointer hover:border-[#691F74]"
          onClick={() => {
            handleSelectChanges("2");
          }}
        >
          <div className="flex flex-col items-center gap-3">
            <FaUserTie className="text-4xl" />
            <p className="text-base">Recruiter</p>
          </div>
        </ReCard>
      </div>
    </div>
  );
}

export default Onbording;
