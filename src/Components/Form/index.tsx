import { Tabs } from "antd";
import ErrorBoundry from "../../ErrorBoundry";
import ActionBar from "../ActionBar";
import Accesses from "./accesses";
import BasicInformation from "./basic-information";
import { FormSubmitType } from "../../core/types/types";
import { useTree } from "../../core/store/hooks/useTree";

interface Props {
  onFormSubmit: (data: FormSubmitType) => void;
  onUpdateAccess: (data: string[]) => void;
}

function Form({ onFormSubmit, onUpdateAccess }: Props) {
  const { selectedNode } = useTree();
  const onUpdateAccessRequest = (data: string[]) => {
    // for handling updates to the access request that was submitted
    onUpdateAccess(data);
  };
  return (
    <div className="detail">
      <div>
        <Tabs>
          <Tabs.TabPane
            disabled={!selectedNode}
            tab="اطلاعات اصلی"
            key="item-1"
          >
            <div className="form-content">
              <BasicInformation onSubmit={onFormSubmit} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane disabled={!selectedNode} tab="دسترسی ها" key="item-2">
            <div className="form-content">
              <ErrorBoundry>
                <Accesses
                  onUpdateAccessRequest={onUpdateAccessRequest}
                  selectedNode={selectedNode}
                />
              </ErrorBoundry>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <ActionBar actions={[]} />
    </div>
  );
}
export default Form;
