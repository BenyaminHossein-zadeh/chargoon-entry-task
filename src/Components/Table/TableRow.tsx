import { UserType } from "../../core/types/types";
import { Button, Checkbox, Popover } from "antd";
import { MoreOutlined } from "@ant-design/icons";

type Props = {
  user: UserType;
  onDefaultChange: (user: UserType) => void;
  onDelete: (userTitle: UserType) => void;
};

function TableRow({ user, onDefaultChange, onDelete }: Props) {
  const deleteContent = (
    <div style={{ cursor: "pointer" }} onClick={() => onDelete(user)}>
      حذف
    </div>
  );

  const handleCheckboxChange = () => {
    onDefaultChange(user);
  };

  return (
    <tr>
      <td>
        <Popover trigger="click" content={deleteContent} placement="bottom">
          <Button size="small" type="text">
            <MoreOutlined />
          </Button>
        </Popover>
      </td>
      <td>
        <Checkbox checked={user?.isDefault} onChange={handleCheckboxChange} />
      </td>
      <td>{user.title}</td>
    </tr>
  );
}

export default TableRow;
