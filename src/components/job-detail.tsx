import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BiWindowClose } from "react-icons/bi";
import { updateJob } from "../api/jobs";
import useFetch from "../hooks/use-fetch";
import JobApplyDrawer from "./job-apply-drawer";
import { FaUsers } from "react-icons/fa";
import ReCard from "../reusable-antd-components/ReCard";
import { Alert, Button } from "antd";
import { AiFillThunderbolt } from "react-icons/ai";
import { useEffect, useState } from "react";
import ApplicantsModal from "./applicants-modal";
import { getPostedDate } from "../Helper/methods";
import { RiFileCloseFill } from "react-icons/ri";
import { updateSelectedJob } from "../redux/slices/job/selected-job";
import { updateOneJob } from "../redux/slices/job/jobs";

export default function JobDetail() {
  const { selectedJob } = useAppSelector((store) => store.selectedJob);
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { makeRequest } = useFetch(updateJob);

  const [applyJobDrawerVisibility, setApplyJobDrawerVisibility] =
    useState<boolean>(false);
  const [viewApplicantsModalVisibility, setViewApplicantsModalVisibility] =
    useState<boolean>(false);

  const [jobStatus, setJobStatus] = useState<boolean>(false);

  async function handleJobStatusChanges(jobId: string, status: boolean) {
    setJobStatus(status);
    await makeRequest({
      id: selectedJob?.id,
      isOpen: status,
    });
    dispatch(updateSelectedJob({ is_open: status }));
    dispatch(
      updateOneJob({
        job_id: jobId,
        updates: { is_open: status },
      })
    );
  }
  console.log(jobStatus);

  useEffect(() => {
    if (selectedJob) {
      setJobStatus(selectedJob?.is_open);
    }
  }, [selectedJob]);

  return selectedJob ? (
    <ReCard>
      <div className="flex items-start gap-7 mb-5">
        <img
          className="h-[3rem] border p-2 rounded-md"
          src={selectedJob?.company?.logo_url}
          alt="company logo"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">{selectedJob?.title}</h1>
          </div>
          <h4>
            {`${selectedJob?.company?.name} • ${
              selectedJob?.location
            } • ${getPostedDate(selectedJob?.created_at)}`}
          </h4>
          {selectedJob?.recruiter_id !== user?.id ? (
            <div className="flex items-center gap-2">
              <FaUsers className="text-xl mt-[2px]" />
              <p>{selectedJob?.applications?.length} Applicants</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-2">
              <Button
                onClick={() => {
                  handleJobStatusChanges(selectedJob.id, !jobStatus);
                }}
                size="small"
                icon={<RiFileCloseFill className="text-lg" />}
                className={`rounded-full py-[17px] px-4 relative overflow-hidden focus:outline-none peer`}
                style={
                  !jobStatus
                    ? { border: "1px solid #691F74", color: "#691F74" }
                    : {}
                }
              >
                Close Hiring
              </Button>
              <Button
                icon={<FaUsers className="text-xl" />}
                className="h-9 rounded-full w-32"
                size="small"
                onClick={() => {
                  setViewApplicantsModalVisibility(true);
                }}
              >
                Applicants
              </Button>
              <ApplicantsModal
                id={selectedJob?.id}
                visibility={viewApplicantsModalVisibility}
                setVisibility={setViewApplicantsModalVisibility}
              />
            </div>
          )}
          {!selectedJob?.is_open && selectedJob?.recruiter_id !== user?.id ? (
            <div className="flex gap-2 items-center">
              <BiWindowClose className="text-red-600 text-lg" />
              <p className="text-red-600">No longer accepting applications</p>
            </div>
          ) : (
            <>
              {selectedJob?.recruiter_id !== user?.id && (
                <>
                  {selectedJob.applyStatus?.find(
                    (ele: any) => ele.job_id === selectedJob.id
                  ) ? (
                    <Alert
                      className="mt-2"
                      message={selectedJob?.applyStatus?.status}
                      type="success"
                      showIcon
                    />
                  ) : (
                    <>
                      <Button
                        icon={
                          <AiFillThunderbolt className="mt-[3px] text-lg" />
                        }
                        className="mt-2 h-9 rounded-full w-36"
                        onClick={() => {
                          setApplyJobDrawerVisibility(true);
                        }}
                      >
                        Quick Apply
                      </Button>
                      <JobApplyDrawer
                        visibility={applyJobDrawerVisibility}
                        setVisibility={setApplyJobDrawerVisibility}
                      />
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-5 mt-5 h-[90vh] overflow-y-scroll hide-scrollbar">
        <div>
          <h1 className="text-[14px] font-bold">Description</h1>
          <p style={{ color: "#676767" }}>{selectedJob?.description}</p>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{ __html: selectedJob?.requirements }}
          />
        </div>
      </div>
    </ReCard>
  ) : (
    <></>
  );
}
