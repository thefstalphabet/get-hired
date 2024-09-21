import { useEffect, useState } from "react";
import { getJobs } from "../api/jobs";
import useFetch from "../hooks/use-fetch";
import { useUser } from "@clerk/clerk-react";
import JobCard from "./job-card";
import { Skeleton } from "./ui/skeleton";
import JobCardSkeleton from "./job-card-skeleton";

export default function JobsListing() {
  const [location, setLocation] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const { isLoaded } = useUser();

  const { makeRequest, data, loading } = useFetch(getJobs, {
    location: location,
    company_id: companyId,
    searchQuery: jobTitle,
  });

  const handleOnBookmark = () => {};

  useEffect(() => {
    makeRequest();
  }, [isLoaded]);

  return (
    <div className="flex flex-col gap-3 h-[60vh] overflow-y-scroll hide-scrollbar">
      {!loading ? (
        data?.map((job: any) => {
          return (
            <JobCard
              job={job}
              onBookmark={handleOnBookmark}
              isMyJob={false}
              savedInit={job?.saved?.length > 0}
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
