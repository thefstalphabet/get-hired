import { useEffect } from "react";
import { getJobApplication } from "../api/application";
import useFetch from "../hooks/use-fetch";
import ReModal from "../reusable-antd-components/ReModal";
import ReTable from "../reusable-antd-components/ReTable/ReTable";
import { capitalizeFirstLetter, formatDate } from "../Helper/methods";
import { GrView } from "react-icons/gr";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

export default function ApplicantsModal(props: {
  id: string;
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { visibility, setVisibility, id } = props;
  const { makeRequest, data, loading } = useFetch(getJobApplication);

  function handleEditClicks() {}
  function handleResumeDownload() {}

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "id",
      width: "4rem",
      render: (id: string) => {
        return (
          <AiFillEdit
            className="cursor-pointer text-lg"
            onClick={() => {
              handleEditClicks(id);
            }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Experience",
      dataIndex: "experience_year",
      key: "experience_year",
      render: (experience_year: number, data: any) => {
        return `${experience_year}.${data?.experience_month} Years`;
      },
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
    },

    {
      title: "Applied Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: Date) => {
        return formatDate(created_at);
      },
    },

    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        return capitalizeFirstLetter(status);
      },
    },
    {
      title: "Resume",
      dataIndex: "resume",
      key: "resume",
      render: (resume: string) => {
        return (
          <div className="flex items-center gap-2">
            <Link to={resume} target="_blank">
              <GrView className="cursor-pointer" />
            </Link>
            <span>|</span>
            <FaDownload onClick={handleResumeDownload} />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    makeRequest({ id });
  }, [visibility]);
  return (
    <ReModal
      width="80%"
      visibility={visibility}
      onCancel={() => {
        setVisibility(false);
      }}
      footer={false}
    >
      <ReTable
        loading={loading}
        scroll={{
          x: 800,
          y: 800,
        }}
        columns={columns}
        data={data}
      />
    </ReModal>
  );
}
