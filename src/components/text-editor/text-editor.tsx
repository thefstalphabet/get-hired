import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./styles.css";
import { Form } from "antd";

export default function TextEditor(props: { label: string; name: string }) {
  const { label, name } = props;
  return (
    <Form.Item
      rules={[{ message: `Please enter the ${label}` }, { required: true }]}
      required
      label={label}
      name={name}
    >
      <ReactQuill
        style={{ border: "1px solid #d9d9d9", borderRadius: "5px" }}
      />
    </Form.Item>
  );
}
