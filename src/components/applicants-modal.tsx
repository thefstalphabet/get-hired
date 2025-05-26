import { useEffect, useState } from "react";
import { getJobApplication, updateApplication } from "../api/application";
import useFetch from "../hooks/use-fetch";
import ReModal from "../reusable-antd-components/ReModal";
import { formatDate } from "../Helper/methods";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Avatar, Button, List, Select } from "antd";
import { HiArrowLeft } from "react-icons/hi";
import { PiUserBold } from "react-icons/pi";

const statusDropdownItems = [
  { value: "applied", label: "Applied" },
  { value: "interviewing", label: "Interviewing" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

export default function ApplicantsModal(props: {
  id: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { visibility, setVisibility, id } = props;
  const { makeRequest, data, loading } = useFetch(getJobApplication);
  const { makeRequest: changeStatus } = useFetch(updateApplication);
  const [detailedView, setDetailedView] = useState<boolean>(false);
  const [selectedApplication, setSelectedApplication] = useState<null | any>(
    null
  );

  // function handleResumeDownload() {}
  // async function handleStatusChanges(value: string) {
  //   await changeStatus({ job_id: id, status: value });
  //   setSelectedApplication((prev: any) => {
  //     return {
  //       ...prev,
  //       status: value,
  //     };
  //   });
  // }

  useEffect(() => {
    makeRequest({ id });
  }, [visibility]);

  return (
    <ReModal
      width="50%"
      visibility={visibility}
      onCancel={() => {
        setVisibility(false);
      }}
      footer={false}
      closable={detailedView ? false : true}
      title={
        selectedApplication === null ? (
          "Applicants"
        ) : (
          <div className="flex items-center gap-2">
            <HiArrowLeft
              className="cursor-pointer text-lg mt-[3px]"
              onClick={() => {
                setDetailedView(false);
                setSelectedApplication(null);
              }}
            />
            <p>{selectedApplication?.name}'s Application</p>
          </div>
        )
      }
    >
      {detailedView ? (
        <div className="mt-4 grid gap-3">
          <h1>
            <span className="font-bold">Experience: </span>
            {`${selectedApplication?.experience_year}.${selectedApplication?.experience_month} Years`}
          </h1>
          <p>
            <span className="font-bold">Skills: </span>{" "}
            {selectedApplication?.skills}
          </p>
          <p>
            <span className="font-bold">Applied on: </span>
            {formatDate(selectedApplication?.created_at)}
          </p>
          <div className="flex gap-2 items-center">
            <h1 className="font-bold">Status:</h1>
            <Select
              style={{ width: 300 }}
              // onChange={handleStatusChanges}
              value={selectedApplication?.status}
              options={statusDropdownItems}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">Resume: </span>
            <Link to={selectedApplication?.resume} target="_blank">
              <GrView className="cursor-pointer" />
            </Link>
          </div>
        </div>
      ) : (
        <List
          loading={loading}
          className="mt-4"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item: any, index) => (
            <List.Item key={index}>
              <List.Item.Meta
                avatar={
                  <Avatar className="mt-1" icon={<PiUserBold />} size="large" />
                }
                title={item.name}
                description={`I have ${item?.experience_year}.${item?.experience_month} Years of experience `}
              />
              <Button
                type="link"
                onClick={() => {
                  setSelectedApplication(item);
                  setDetailedView(true);
                }}
              >
                See More
              </Button>
            </List.Item>
          )}
        />
      )}
    </ReModal>
  );
}
