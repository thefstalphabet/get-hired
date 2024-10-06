import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { BiWindowClose } from "react-icons/bi";
import { updateJob } from "../api/jobs";
import useFetch from "../hooks/use-fetch";
import { updateSelectedJob } from "../redux/slices/job";
import JobApplyDrawer from "./job-apply-drawer";
import { FaUsers } from "react-icons/fa";
import ReCard from "../reusable-antd-components/ReCard";
import { Button, Checkbox } from "antd";
import { AiFillThunderbolt } from "react-icons/ai";
import { useState } from "react";
import ApplicantsModal from "./applicants-modal";

export default function JobDetail() {
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { makeRequest } = useFetch(updateJob);

  const [applyJobDrawerVisibility, setApplyJobDrawerVisibility] =
    useState<boolean>(false);
  const [viewApplicantsModalVisibility, setViewApplicantsModalVisibility] =
    useState<boolean>(false);

  async function handleJobStatusChanges(e: any) {
    await makeRequest({
      id: selectedJob?.id,
      isOpen: e?.target?.checked,
    });
    dispatch(updateSelectedJob({ is_open: e?.target?.checked }));
  }

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
          <div className="flex gap-1">
            <h4 className="font-semibold">{selectedJob?.company?.name}</h4>
            <span>|</span>
            <h4 className="font-semibold">{selectedJob?.location}</h4>
          </div>

          {selectedJob?.recruiter_id === user?.id ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="closed"
                checked={selectedJob?.is_open}
                onChange={handleJobStatusChanges}
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Do you want to close this opening?
              </label>
            </div>
          ) : (
            <p>
              {!selectedJob?.is_open && (
                <div className="flex gap-2 items-center">
                  <BiWindowClose className="text-red-600 text-lg" />
                  <p className="text-red-600">
                    No longer accepting applications
                  </p>
                </div>
              )}
            </p>
          )}
          {selectedJob?.recruiter_id !== user?.id ? (
            <div className="flex items-center gap-2">
              <FaUsers className="text-xl mt-[2px]" />
              <p>{selectedJob?.applications?.length} Applicants</p>
            </div>
          ) : (
            <>
              <Button
                icon={<FaUsers className="text-xl mt-[2px]" />}
                className="mt-2 h-9 rounded-full w-36"
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
            </>
          )}
          {selectedJob?.recruiter_id !== user?.id && (
            <>
              <Button
                icon={<AiFillThunderbolt className="mt-[3px] text-lg" />}
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
