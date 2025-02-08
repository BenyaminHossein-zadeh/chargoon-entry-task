import { Button, Checkbox, Popover } from "antd";
import "./table.css";
import { NodeType, UserType } from "../../core/types/types";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
interface Props {
  selectedUsers: [] | UserType[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<[] | UserType[]>>;
}
function Table({ selectedUsers, setSelectedUsers }: Props) {
  const handleDefaultChange = (user: UserType) => {
    // Toggle isDefault for the current user and set all other users to false
    const newValue = !user.isDefault;
    setSelectedUsers((pre) =>
      pre.map((item: UserType) => {
        if (item.title === user.title) {
          return { ...item, isDefault: newValue };
        } else if (newValue) {
          return { ...item, isDefault: false };
        }
        return item;
      })
    );
  };
  const handleDelete = (userToDelete: UserType) => {
    // Filter out the user to be deleted and set the default user if there is one left
    const updatedUsers = (selectedUsers as UserType[]).filter(
      (user: UserType) => user.title !== userToDelete.title
    );

    // Check if there is no isDefault user
    if (userToDelete.isDefault && updatedUsers.length > 0) {
      updatedUsers[0].isDefault = true;
    }
    // Set the updated users
    setSelectedUsers(updatedUsers);
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table>
        <TableHead />
        <tbody>
          {selectedUsers?.map((user: UserType) => (
            <TableRow
              key={user.title}
              user={user}
              onDefaultChange={handleDefaultChange}
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Table;
