import JobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import { useAppSelector } from "../redux/hooks";
import { RiSearchLine } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { useState } from "react";

export default function JobsListing(props: { loading: boolean }) {
  const { loading } = props;
  const { searchedJobs } = useAppSelector((store) => store.job);
  const [jobView, setJobView] = useState<"card" | "list">("card");

  return (
    <div className="flex flex-col gap-1 h-screen overflow-y-scroll hide-scrollbar pb-5">
      <div className="flex justify-between mb-2">
        <div className="flex gap-1 items-center">
          <RiSearchLine className="text-xs"/>
          <h5 className="text-xs">Showing result based on your search</h5>
        </div>
        <div className="flex gap-2 items-center">
          <BsCardText
            className="cursor-pointer"
            color={`${jobView === "card" ? "#691F74" : ""}`}
            onClick={() => {
              setJobView("card");
            }}
          />
          <FaListUl
            color={`${jobView === "list" ? "#691F74" : ""}`}
            className="text-sm cursor-pointer"
            onClick={() => {
              setJobView("list");
            }}
          />
        </div>
      </div>
      {!loading ? (
        searchedJobs?.map((job: any) => {
          const saved = job?.saved?.find((ele: any) => ele.job_id === job?.id);
          return (
            <JobCard
              view={jobView}
              key={job?.id}
              job={job}
              alreadySaved={saved ? true : false}
            />
          );
        })
      ) : (
        <>
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </>
      )}
    </div>
  );
}
