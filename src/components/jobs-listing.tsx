import JobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import { useAppSelector } from "../redux/hooks";
import { RiSearchLine } from "react-icons/ri";
import { BsCardText } from "react-icons/bs";
import { useState } from "react";
import { IoIosList } from "react-icons/io";
import { Segmented } from "antd";

export default function JobsListing(props: { loading: boolean }) {
  const { loading } = props;
  const { jobs } = useAppSelector((store) => store.jobs);
  const [jobView, setJobView] = useState<"card" | "list">("card");

  return (
    <div className="flex flex-col gap-1 h-screen overflow-y-scroll hide-scrollbar pb-5">
      <div className="flex justify-between mb-2">
        <div className="flex gap-1 items-center">
          <RiSearchLine className="text-xs" />
          <h5 className="text-xs">Showing result based on your search</h5>
        </div>
        <Segmented
          onChange={(value: "card" | "list") => {
            setJobView(value);
          }}
          options={[
            { value: "card", icon: <BsCardText className="mt-[7.5px]" /> },
            { value: "list", icon: <IoIosList className="mt-[7.5px]" /> },
          ]}
        />
      </div>
      {!loading ? (
        jobs?.map((job: any) => {
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
