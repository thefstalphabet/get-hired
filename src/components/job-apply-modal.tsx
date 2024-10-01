import { useAppSelector } from "../redux/hooks";
import useFetch from "../hooks/use-fetch";
import { applyToJob } from "../api/application";
import { useUser } from "@clerk/clerk-react";
import { Button, Form } from "antd";
import ReDrawer from "../reusable-antd-components/ReDrawer";
import ReForm from "../reusable-antd-components/ReForm";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import ReUpload from "../reusable-antd-components/ReFormFields/ReUpload";
import { FaPlus } from "react-icons/fa";

export default function JobApplyModal(props: {
  visibility: boolean;
  setVisibility: Function;
}) {
  const { makeRequest, loading } = useFetch(applyToJob, {});
  const { visibility, setVisibility } = props;
  const [form] = Form.useForm();

  const { user } = useUser();
  const { selectedJob } = useAppSelector((store) => store.job);

  function handleFormSubmit(data: any) {
    makeRequest({
      ...data,
      job_id: selectedJob?.id,
      candidate_id: user?.id,
      name: user?.fullName,
      resume: data?.resume[0],
    });
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
          onClick={() => {
            form.submit();
          }}
        >
          Apply
        </Button>
      }
    >
      <ReForm formInstance={form} onSubmit={handleFormSubmit}>
        <ReUpload
          required
          onRemove={() => {}}
          accept=".pdf"
          label="Resume"
          name="resume"
          fileList={[]}
          fileListMaxCount={1}
          onBeforeUpload={() => {}}
          uploadIcon={<FaPlus />}
          listType="picture-card"
        />
        <div className="grid grid-flow-col gap-2">
          <ReInput
            label="Experience Year"
            name="experience_year"
            type="number"
            required
          />
          <ReInput
            label="Experience Month"
            name="experience_month"
            type="number"
            required
          />
        </div>

        <ReInput
          label="Skills"
          placeholder="Comma separated skills"
          name="skills"
          type="simple"
          required
        />
        <ReInput
          label="Phone Number"
          name="phone_number"
          type="simple"
          required
          placeholder="Your phone number"
        />
      </ReForm>
    </ReDrawer>
  );
}
