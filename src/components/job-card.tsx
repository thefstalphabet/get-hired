import useFetch from "../hooks/use-fetch";
import { bookmarkJob, deleteJob } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ReCard from "../reusable-antd-components/ReCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getPostedDate } from "../Helper/methods";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Popconfirm } from "antd";
import { ReNotification } from "../reusable-antd-components/ReNotification";
import { removeOneJob, updateOneJob } from "../redux/slices/job/jobs";
import { setSelectedJob } from "../redux/slices/job/selected-job";

export default function JobCard(props: {
  job: any;
  alreadySaved: boolean;
  view: "card" | "list";
}) {
  const { job, alreadySaved, view } = props;
  const dispatch = useAppDispatch();
  const { selectedJob } = useAppSelector((store) => store.selectedJob);
  const { user } = useUser();
  const { makeRequest } = useFetch(bookmarkJob);
  const { makeRequest: removeJob } = useFetch(deleteJob);

  const handleBookmarkClicks = async () => {
    await makeRequest({
      user_id: user?.id,
      job_id: job?.id,
      alreadyBookmarked: alreadySaved,
    });
    dispatch(updateOneJob({ job_id: job.id, updates: {}, alreadySaved }));
  };

  const handleJobRemoveClicks = async (id: string) => {
    await removeJob({ job_id: id });
    dispatch(removeOneJob(id));
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

  const optionIcons = (
    <>
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
          <RiDeleteBin6Fill className="text-lg cursor-pointer" />
        </Popconfirm>
      )}
    </>
  );

  return view === "card" ? (
    <ReCard className={`${job?.id === selectedJob?.id && "border-[#691F74]"}`}>
      <img
        className="h-[3rem] border p-2 rounded-md mb-2 cursor-pointer"
        src={job?.company?.logo_url}
        alt="company logo"
        onClick={handleOnCardClicks}
      />
      <div className="grid grid-flow-col gap-3">
        <div className="cursor-pointer" onClick={handleOnCardClicks}>
          <h1 className="text-lg font-bold">{job?.title}</h1>
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
        {optionIcons}
      </div>
    </ReCard>
  ) : (
    <div
      style={{
        border: `1px solid ${
          job?.id === selectedJob?.id ? "#691F74" : "#F0F0F0"
        }`,
      }}
      className={` bg-white p-3 rounded-md flex items-center justify-between`}
    >
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={handleOnCardClicks}
      >
        <img
          className="h-[2rem] border p-2 rounded-md"
          src={job?.company?.logo_url}
          alt="company logo"
        />
        <div className="cursor-pointer" onClick={handleOnCardClicks}>
          <h1 className="text-sm font-medium">{job?.title}</h1>
          <h4 className="text-xs" style={{ color: "#676767" }}>
            {`${job?.company?.name} • ${job?.location} • ${getPostedDate(
              job?.created_at
            )}`}
          </h4>
        </div>
      </div>
      {optionIcons}
    </div>
  );
}
