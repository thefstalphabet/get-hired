import { useAppSelector } from "../redux/hooks";
import useFetch from "../hooks/use-fetch";
import { applyToJob } from "../api/application";
import { useUser } from "@clerk/clerk-react";
import { Button, Form, UploadFile } from "antd";
import ReDrawer from "../reusable-antd-components/ReDrawer";
import ReForm from "../reusable-antd-components/ReForm";
import ReUpload from "../reusable-antd-components/ReFormFields/ReUpload";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";

export default function JobApplyDrawer(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { makeRequest, loading } = useFetch(applyToJob);
  const { visibility, setVisibility } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);

  const { user } = useUser();
  const { selectedJob } = useAppSelector((store) => store.selectedJob);

  function handleFormSubmit(data: any) {
    const fileData = data?.resume?.file?.originFileObj;
    let payload = {
      ...data,
      job_id: selectedJob?.id,
      candidate_id: user?.id,
      name: user?.fullName,
    };
    if (fileData) {
      payload["resume"] = fileData;
    }
    makeRequest(payload);
    setVisibility(false);
  }

  return (
    <ReDrawer
      title={<h3>{`Apply to ${selectedJob?.company?.name}`}</h3>}
      visibility={visibility}
      onCancel={() => {
        setVisibility(false);
      }}
      placement="right"
      closable
      width={650}
      extraContent={
        <Button
          className="create-btn"
          type="primary"
          loading={loading}
          onClick={() => {
            form.submit();
          }}
        >
          Apply
        </Button>
      }
    >
      <ReForm
        resetFieldsAfterSubmit
        formInstance={form}
        onSubmit={handleFormSubmit}
      >
        <ReUpload
          required
          accept=".pdf"
          label="Resume"
          name="resume"
          listType="picture-card"
          fileList={fileList}
          uploadIcon={<FaPlus className="text-2xl" />}
          fileListMaxCount={1}
          beforeUpload={(fileData: UploadFile<File>) => {
            setFileList([fileData]);
          }}
          onRemove={() => {
            setFileList([]);
          }}
        />
        <div className="grid grid-flow-col gap-2">
          <ReInput
            label="Experience Year"
            name="experience_year"
            type="number"
            required
            min={0}
            max={50}
          />
          <ReInput
            label="Experience Month"
            name="experience_month"
            type="number"
            required
            min={0}
            max={11}
          />
        </div>

        <ReInput
          label="Skills"
          placeholder="Comma separated skills"
          name="skills"
          type="string"
          required
        />
        <ReInput
          label="Phone Number"
          name="phone_number"
          type="string"
          required
          placeholder="Your phone number"
        />
      </ReForm>
    </ReDrawer>
  );
}
