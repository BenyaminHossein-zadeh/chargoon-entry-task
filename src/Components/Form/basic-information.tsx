import { Button, Form, Input } from "antd";
import UserAutoComplete from "./user-autocomplete";
import Table from "../Table";
import { FormSubmitType, UserType } from "../../core/types/types";
import { useEffect, useState } from "react";
import { useTree } from "../../core/store/hooks/useTree";
interface Props {
  onSubmit: (data: FormSubmitType) => void;
}

function BasicInformation({ onSubmit }: Props) {
  const [form] = Form.useForm();
  const {
    selectedNode,
    treeData,
    Helper: { isKeyExist, genrateNewKey },
  } = useTree();
  const [selectedUsers, setSelectedUsers] = useState<UserType[]>();
  const [keyError, setKeyError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    // for fill fields with data from the selected node
    if (selectedNode) {
      setSelectedUsers(selectedNode.users);
      form.setFieldsValue({
        users: selectedNode.users,
        key: selectedNode.key,
        title: selectedNode.title,
      });
    }
  }, [selectedNode]);

  const checkValidate = (newFormData: Record<string, string>) => {
    // for validation forms, required title to not be empty & required key to not be duplicated
    if (newFormData.hasOwnProperty("key")) checkKey(newFormData["key"]);
    if (
      newFormData.hasOwnProperty("title") &&
      titleError !== (newFormData["title"] === "")
    ) {
      setTitleError(newFormData["title"] === "");
    }
  };

  const checkKey = (newValue: string) => {
    // for checking keys in fields if it is duplicated or not
    const isExist = isKeyExist(newValue);
    const isnotValid = isExist && newValue !== selectedNode.key;
    if (keyError !== isnotValid) setKeyError(isnotValid);
  };
  const isKeyDisable = (): boolean => {
    // for disabling key field if it is not a new node
    if (selectedNode)
      if (!selectedNode.parentKey || selectedNode.hierarchy.length > 0)
        return true;
    return false;
  };
  return (
    <Form
      disabled={!selectedNode}
      onFinish={(data) => {
        onSubmit({ ...data, users: [...selectedUsers] });
        form.resetFields(["title", "key"]);
      }}
      onValuesChange={checkValidate}
      wrapperCol={{ span: 8 }}
      form={form}
    >
      <Form.Item
        validateStatus={titleError ? "error" : "success"}
        help={titleError ? "عنوان نباید خالی باشد." : ""}
        name="title"
        label="عنوان"
        labelCol={{ span: 2 }}
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        required
        validateStatus={keyError ? "error" : "success"}
        help={
          keyError
            ? `کد تکراری است. کد پیشنهادی: ${genrateNewKey(treeData)}`
            : ""
        }
        name="key"
        label="کد"
        labelCol={{ span: 2 }}
      >
        <Input disabled={isKeyDisable()} status={keyError ? "error" : ""} />
      </Form.Item>

      <Form.Item name="users" label="کاربران" labelCol={{ span: 2 }}>
        <UserAutoComplete
          selectedNode={selectedNode}
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      </Form.Item>
      <Form.Item label="جدول" labelCol={{ span: 2 }}>
        <Table
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
      </Form.Item>
      <Form.Item label={null}>
        <Button
          disabled={keyError || form.getFieldValue("title") === ""}
          type="primary"
          htmlType="submit"
        >
          ذخیره
        </Button>
      </Form.Item>
    </Form>
  );
}
export default BasicInformation;
