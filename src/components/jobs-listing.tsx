import JobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import { useAppSelector } from "../redux/hooks";

export default function JobsListing(props: { loading: boolean }) {
  const { loading } = props;
  const { searchedJobs } = useAppSelector((store) => store.job);

  return (
    <div className="flex flex-col gap-3 h-[90vh] overflow-y-scroll hide-scrollbar">
      {!loading ? (
        searchedJobs?.map((job: any) => {
          return <JobCard job={job} />;
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
