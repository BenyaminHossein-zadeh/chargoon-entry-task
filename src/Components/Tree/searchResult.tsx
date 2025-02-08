import { useState } from "react";
import { NodeType } from "../../core/types/types";
import ArrowDownIcon from "../SvgIcons/arrow-down";
import ArrowUpIcon from "../SvgIcons/arrow-up";
import OrgchartIcon from "../SvgIcons/orgchart";
import { Button, Popover } from "antd";
import MiniTree from "./MiniTree";

interface Props {
  items: (NodeType & { hierarchy: string[] })[];
}

function SearchResult({ items }: Props) {
  const [height, setHeight] = useState<string | number>("200px");
  return (
    <div
      className="search-result"
      style={{
        height: height,
        overflow: "auto",
        transition: "500ms",
      }}
    >
      <div
        className="arraw-down"
        onClick={() => {
          height === "200px" ? setHeight("30px") : setHeight("200px");
        }}
      >
        {height === "200px" ? (
          <ArrowDownIcon width={15} />
        ) : (
          <ArrowUpIcon width={15} />
        )}
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px",
          }}
        >
          {" "}
          <span> {item.title} </span>{" "}
          <Popover
            content={
              <div>
                <MiniTree node={item} />
              </div>
            }
            trigger="hover"
            placement="top"
            title={item.title}
          >
            <Button type="text">
              <OrgchartIcon />
            </Button>
          </Popover>
        </div>
      ))}
    </div>
  );
}
export default SearchResult;
