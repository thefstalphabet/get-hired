import React from "react";
import ReDrawer from "../reusable-antd-components/ReDrawer";
import { Button, Form } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import ReSelect from "../reusable-antd-components/ReFormFields/ReSelect";
import { getCompanies } from "../api/company";
import useFetch from "../hooks/use-fetch";
import { State } from "country-state-city";
import TextEditor from "./text-editor/text-editor";

export default function PostJobDrawer(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const { visibility, setVisibility } = props;
  const { data: companies } = useFetch(getCompanies, {});

  function handleFormSubmit(data: any) {
    console.log(data);
  }

  return (
    <ReDrawer
      title={<h3>{`Post Job`}</h3>}
      visibility={true}
      onCancel={() => {
        setVisibility(false);
      }}
      placement="right"
      closable
      width={800}
      extraContent={
        <Button
          className="create-btn"
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
