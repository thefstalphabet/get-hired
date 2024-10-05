import React, { useState } from "react";
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

export default function PostJobDrawer(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const { visibility, setVisibility } = props;
  const { data: companies } = useFetch(getCompanies, {});
  const [addCompanyModalVisibility, setAddCompanyModalVisibility] =
    useState<boolean>(false);

  function handleFormSubmit(data: any) {
    console.log(data);
  }

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
            name="companyId"
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
        <TextEditor label="Job Requirement" name="requirement" />
      </ReForm>
    </ReDrawer>
  );
}
