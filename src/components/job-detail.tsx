import { useUser } from "@clerk/clerk-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { BiWindowClose } from "react-icons/bi";
import { Checkbox } from "./ui/checkbox";
import { updateJob } from "../api/jobs";
import useFetch from "../hooks/use-fetch";
import { updateSelectedJob } from "../redux/slices/job";
import ApplyJobModal from "./apply-job-modal";

export default function JobDetail() {
  const { selectedJob } = useAppSelector((store) => store.job);
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { makeRequest } = useFetch(updateJob);

  async function handleJobStatusChanges(value: boolean) {
    await makeRequest({
      id: selectedJob?.id,
      isOpen: value,
    });
    dispatch(updateSelectedJob({ is_open: value }));
  }

  return selectedJob ? (
    <div className="bg-white p-5 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-start gap-7 mb-5">
        <img
          className="h-[3rem] border p-2 rounded-md"
          src={selectedJob?.company.logo_url}
          alt="company logo"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">{selectedJob?.title}</h1>
          </div>
          <div className="flex gap-1">
            <h4 className="font-semibold">{selectedJob?.company.name}</h4>
            <span>|</span>
            <h4 className="font-semibold">{selectedJob?.location}</h4>
          </div>
          {selectedJob?.recruiter_id === user?.id ? (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="closed"
                checked={selectedJob?.is_open}
                onCheckedChange={handleJobStatusChanges}
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
          {selectedJob?.recruiter_id === user?.id && <ApplyJobModal />}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-5 mt-5 h-[90vh] overflow-y-scroll hide-scrollbar">
        <div>
          <h1 className="text-lg font-semibold">Description:</h1>
          <p style={{ color: "#676767" }}>{selectedJob?.description}</p>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Requirments:</h1>
          <p style={{ color: "#676767" }}>{selectedJob?.requirements}</p>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
