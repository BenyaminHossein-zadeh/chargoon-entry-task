import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import { getAccessList } from "../../core/services/transportLayer";
import { NodeType } from "../../core/types/types";

interface Props {
  onUpdateAccessRequest: (data: string[]) => void;
  selectedNode: NodeType | undefined;
}

function Accesses({ onUpdateAccessRequest, selectedNode }: Props) {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );
  const [value, setValue] = useState<string[]>([]);

  const setInitialValue = async () => {
    // for fetching the initial value for selecting between AccessList
    const result = await getAccessList();
    setOptions(
      result.map((option) => {
        return { label: option.label, value: option.id };
      })
    );

    // for pre-selecting the AccessList when a node is selected
    if (selectedNode) setValue([...selectedNode?.accesses]);
  };

  useEffect(() => {
    setInitialValue();
  }, [selectedNode]);

  const handleSave = () => {
    // for saving the selected AccessList
    onUpdateAccessRequest(value);
  };
  const isAbleToSave = (): boolean => {
    // for checking if the selected AccessList is different from the initial one
    if (JSON.stringify(selectedNode?.accesses) === JSON.stringify(value))
      return false;

    return true;
  };
  return (
    <>
      <Checkbox.Group
        value={value}
        options={options}
        onChange={(data) => setValue(data.map(String))}
      />
      <Button disabled={!isAbleToSave()} onClick={handleSave}>
        ذخیره
      </Button>
    </>
  );
}
export default Accesses;
