import React, { useEffect, useState } from "react";
import ReDrawer from "../reusable-antd-components/ReDrawer";
import { Button, Form } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import ReSelect from "../reusable-antd-components/ReFormFields/ReSelect";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { State } from "country-state-city";
import TextEditor from "./text-editor/text-editor";
import AddCompanyModal from "./add-company-modal";
import { MdDomainAdd } from "react-icons/md";
import { addNewJob, getJobs } from "../api/jobs";
import { useUser } from "@clerk/clerk-react";
import { ReNotification } from "../reusable-antd-components/ReNotification";
import { useAppDispatch } from "../redux/hooks";
import { setJobs } from "../redux/slices/job/jobs";

export default function PostJobDrawer(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const { visibility, setVisibility } = props;
  const { data: companies, makeRequest: fetchCompanies } = useFetch(
    getCompanies,
    {},
    true
  );
  const { data: jobs, makeRequest: fetchJobs } = useFetch(getJobs, {
    user_id: user?.id,
  });
  const { makeRequest: createNewJob } = useFetch(addNewJob, {});
  const [addCompanyModalVisibility, setAddCompanyModalVisibility] =
    useState<boolean>(false);

  async function handleFormSubmit(data: any) {
    const payload = {
      recruiter_id: user?.id,
      ...data,
    };
    await createNewJob(payload);
    await fetchJobs();
    ReNotification({
      description: "New Job create sucessfully",
      duration: 1,
      placement: "topRight",
      type: "success",
    });
    setVisibility(false);
  }

  useEffect(() => {
    dispatch(setJobs(jobs));
  }, [jobs]);

  return (
    <ReDrawer
      title={<h3>Post New Job</h3>}
      visibility={visibility}
      onCancel={() => {
        setVisibility(false);
      }}
      placement="right"
      closable
      width={800}
      extraContent={
        <Button
          type="primary"
          onClick={() => {
            form.submit();
          }}
        >
          Post
        </Button>
      }
    >
      <ReForm
        resetFieldsAfterSubmit
        formInstance={form}
        onSubmit={handleFormSubmit}
      >
        <ReInput label="Job Title" name="title" type="string" required />
        <ReInput
          label="Job Description"
          name="description"
          type="string"
          required
        />
        <div className="grid grid-flow-col grid-cols-1 gap-2 items-center">
          <ReSelect
            required
            label="Company"
            placeholder="Company"
            name="company_id"
            searchable
            items={companies?.map((company: { name: string; id: string }) => {
              const { name, id } = company;
              return {
                label: name,
                value: id,
              };
            })}
          />
          <Button
            icon={<MdDomainAdd className="text-lg" />}
            className="mt-[7px]"
            onClick={() => {
              setAddCompanyModalVisibility(true);
            }}
          />
          <AddCompanyModal
            visibility={addCompanyModalVisibility}
            setVisibility={setAddCompanyModalVisibility}
            fetchCompanies={fetchCompanies}
          />
        </div>
        <ReSelect
          required
          placeholder="Job Location"
          className="w-80"
          label="Location"
          name="location"
          searchable
          items={State?.getStatesOfCountry("IN").map(
            (city: { name: string }) => {
              const { name } = city;
              return {
                label: name,
                value: name,
              };
            }
          )}
        />
        <TextEditor label="Job Requirement" name="requirements" />
      </ReForm>
    </ReDrawer>
  );
}
