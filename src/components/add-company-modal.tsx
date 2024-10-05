import React, { useState } from "react";
import ReDrawer from "../reusable-antd-components/ReDrawer";
import { Button, Form, UploadFile } from "antd";
import ReForm from "../reusable-antd-components/ReForm";
import ReInput from "../reusable-antd-components/ReFormFields/ReInput";
import ReUpload from "../reusable-antd-components/ReFormFields/ReUpload";
import { FaPlus } from "react-icons/fa";

export default function AddCompanyModal(props: {
  visibility: boolean;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [form] = Form.useForm();
  const { visibility, setVisibility } = props;
  const [fileList, setFileList] = useState<UploadFile<File>[]>([]);

  function handleFormSubmit(data: any) {
    console.log(data);
  }
  return (
    <ReDrawer
      title={<h3>Create New Company</h3>}
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
          Create
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
          accept=".png"
          label="Logo"
          name="logo"
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
        <ReInput label="Name" name="name" type="string" required />
      </ReForm>
    </ReDrawer>
  );
}
