import useFetch from "../hooks/use-fetch";
import { bookmarkJob, deleteJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setSelectedJob, updateSearchedJob } from "../redux/slices/job";
import ReCard from "../reusable-antd-components/ReCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getPostedDate } from "../Helper/methods";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Popconfirm } from "antd";
import { ReNotification } from "../reusable-antd-components/ReNotification";

export default function JobCard(props: {
  job: any;
  alreadySaved: boolean;
  view: "card" | "list";
}) {
  const { job, alreadySaved, view } = props;
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const { makeRequest } = useFetch(bookmarkJob);
  const { makeRequest: removeJob } = useFetch(deleteJob);

  const handleBookmarkClicks = async () => {
    await makeRequest({
      user_id: user?.id,
      job_id: job?.id,
      alreadyBookmarked: alreadySaved,
    });
    dispatch(updateSearchedJob({ job_id: job.id, updates: {}, alreadySaved }));
  };

  const handleJobRemoveClicks = async (id: string) => {
    await removeJob({ job_id: id });
    ReNotification({
      description: "Job deleted sucessfully",
      duration: 1,
      placement: "topRight",
      type: "success",
    });
  };

  const handleOnCardClicks = () => {
    dispatch(setSelectedJob(job));
  };

  return view === "card" ? (
    <ReCard
      className={`cursor-pointer  ${
        job?.id === selectedJob?.id && "border-[#691F74]"
      }`}
      onClick={handleOnCardClicks}
    >
      <img
        className="h-[3rem] border p-2 rounded-md mb-2"
        src={job?.company?.logo_url}
        alt="company logo"
      />
      <div>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">{job?.title}</h1>
          {!(job?.recruiter_id === user?.id) ? (
            alreadySaved ? (
              <FaHeart
                fill="red"
                className="text-lg cursor-pointe "
                onClick={handleBookmarkClicks}
              />
            ) : (
              <FaRegHeart
                className="text-lg cursor-pointer"
                onClick={handleBookmarkClicks}
              />
            )
          ) : (
            <Popconfirm
              title="Delete the Job"
              description="Are you sure to delete this job?"
              onConfirm={() => {
                handleJobRemoveClicks(job?.id);
              }}
              okText="Yes"
              cancelText="No"
            >
              <RiDeleteBin6Fill className="text-lg" />
            </Popconfirm>
          )}
        </div>
        <h4>
          {`${job?.company?.name} • ${job?.location} • ${getPostedDate(
            job?.created_at
          )}`}
        </h4>
        <div style={{ color: "#676767" }}>
          <p className="text-sm mt-2 pr-10">
            {job?.description?.split(".").slice(0, 2).join(".") +
              (job?.description?.split(".").length > 2 ? "." : "")}
          </p>
        </div>
      </div>
    </ReCard>
  ) : (
    <div
      style={{
        border: `1px solid ${
          job?.id === selectedJob?.id ? "#691F74" : "#F0F0F0"
        }`,
      }}
      className={`cursor-pointer bg-white p-3 rounded-md flex justify-between items-center`}
      onClick={handleOnCardClicks}
    >
      <div className="flex items-center gap-2">
        <img
          className="h-[2rem] border p-2 rounded-md "
          src={job?.company?.logo_url}
          alt="company logo"
        />
        <div>
          <h1 className="text-sm font-medium">{job?.title}</h1>
          <h4 className="text-xs" style={{ color: "#676767" }}>
            {`${job?.company?.name} • ${job?.location} • ${getPostedDate(
              job?.created_at
            )}`}
          </h4>
        </div>
      </div>
      <div>
        {!(job?.recruiter_id === user?.id) && (
          <>
            (alreadySaved ? (
            <FaHeart
              fill="red"
              className="text-base cursor-pointe "
              onClick={handleBookmarkClicks}
            />
            ) : (
            <FaRegHeart
              className="text-base cursor-pointer"
              onClick={handleBookmarkClicks}
            />
            ))
          </>
        )}
      </div>
    </div>
  );
}
