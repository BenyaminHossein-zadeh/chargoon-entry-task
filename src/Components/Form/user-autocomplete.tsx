import { AutoComplete, Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getUsers } from "../../core/services/transportLayer";
import { NodeType, UserType } from "../../core/types/types";

interface prop {
  selectedNode: NodeType | [];
  setSelectedUsers: React.Dispatch<React.SetStateAction<[] | UserType[]>>;
  selectedUsers: [] | UserType[];
}
const UserAutoComplete: React.FC<prop> = ({
  selectedNode,
  setSelectedUsers,
  selectedUsers,
}) => {
  const orginalOptions = useRef([]);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [text, setText] = useState<string>("");

  useEffect(() => {
    // for fetching users options
    getUsers().then((users) => {
      orginalOptions.current = users;
      setOptions(users);
    });
  }, []);

  const onSearch = (searchText: string) => {
    setOptions(
      orginalOptions.current.filter((o) => o.label.indexOf(searchText) > -1)
    );
  };

  const handleAddUser = () => {
    // check if user already exists in selectedUsers array
    const userExists = selectedUsers.some(
      (user: { title: string }) => user.title === text
    );
    if (userExists) {
      alert("این یوزر برای این نود وجود دارد");
      return;
    }
    // check if text is empty
    if (text === "") {
      alert("کاربری انتخاب نشده است!");
      return;
    }
    // add user to selectedUsers array only if it doesn't exist
    setSelectedUsers((selectedUsers) => [
      ...selectedUsers,
      { title: text, isDefault: false },
    ]);
  };

  return (
    <div style={{ display: "flex", flexWrap: "nowrap" }}>
      <AutoComplete
        options={options}
        style={{ width: "100%" }}
        value={text}
        onChange={(e) => setText(e)}
        onSearch={onSearch}
        placeholder="جستجوی کاربر"
      />
      <Button onClick={handleAddUser}>افزودن</Button>
    </div>
  );
};

export default UserAutoComplete;
