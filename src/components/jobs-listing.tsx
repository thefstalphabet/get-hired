import JobCard from "./job-card";
import JobCardSkeleton from "./job-card-skeleton";
import { useAppSelector } from "../redux/Hooks";

export default function JobsListing(props: { loading: boolean }) {
  const { searchedJobs } = useAppSelector((store) => store.job);
  const { loading } = props;
  const handleOnBookmark = () => {};

  return (
    <div className="flex flex-col gap-3 h-[60vh] overflow-y-scroll hide-scrollbar">
      {!loading ? (
        searchedJobs?.map((job: any) => {
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
