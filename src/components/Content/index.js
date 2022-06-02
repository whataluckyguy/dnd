import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDrag } from "react-dnd";
import useContentController from "./useContentController";
import { whiteBG } from "../../utils/colors";
import SettingsSidebar from "./Sidebar/index.js";
import {
  EmptyContentPlaceholder,
  MainContainer,
  StyledContent,
  StyledHeaderContent,
  StyledContentContainer,
} from "./styles.js";
import { ContentState } from "../../Contexts/EmailContent";

export const ContentContainerTemplate = ({
  title,
  deleteContentItem,
  index,
  children: content,
  style,
  provided,
  sectionDetails,
  setsidebarInfo,
}) => {
  const providedProps = provided ? provided.dragHandleProps : {};
  const [drag] = useDrag({
    type: (sectionDetails && sectionDetails.type) || "type",
    item: { id: index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  // const reactdndRef = sectionDetails.type ? drag : null;

  return (
    <StyledContentContainer
    // ref={reactdndRef}
    >
      <StyledHeaderContent {...providedProps}>
        <div
          style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}
        >
          {"📦  "}
          <span style={{ paddingLeft: "10px", color: whiteBG }}> {title} </span>
        </div>
        <div>
          {" "}
          🔗
          <span
            onClick={() => deleteContentItem(index)}
            style={{
              marginLeft: "20px",
              border: "2px solid #fff",
              padding: "1px",
              paddingRight: "6px",
              cursor: "pointer",
              transform: "translateX(-3px)",
              height: "30px",
            }}
          >
            ❌
          </span>
        </div>
      </StyledHeaderContent>

      <StyledContent
        onClick={(e) => {
          document.querySelector("#react-burger-menu-btn").click();
          setsidebarInfo((prev) => {
            if (!sectionDetails) return { contentIndex: index };
            else
              return {
                ...prev,
              };
          });
          e.stopPropagation();
        }}
        style={{ ...style, minWidth: "100%" }}
      >
        {content}
      </StyledContent>
    </StyledContentContainer>
  );
};

export default function ContentController({ buildBG, deleteContentItem }) {
  const { contentData } = ContentState();
  const { content } = useContentController(contentData);
  const [sidebarInfo, setsidebarInfo] = useState(null);

  return (
    <div>
      <SettingsSidebar sidebarInfo={sidebarInfo} />

      <Droppable droppableId="mail-template-content" direction="vertical">
        {(provided) => (
          <MainContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
            buildBG={buildBG}
            className="root-content"
          >
            {contentData.map((d, index) => (
              <Draggable
                draggableId={"content" + index}
                index={index}
                key={"content" + index}
              >
                {(provided, snapshot) => (
                  <div
                    className={"content-item-" + index}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <ContentContainerTemplate
                      title={d.title}
                      style={d.style}
                      key={"content" + index}
                      deleteContentItem={deleteContentItem}
                      index={index}
                      provided={provided}
                      setsidebarInfo={setsidebarInfo}
                    >
                      {content(d.title, index)}
                    </ContentContainerTemplate>
                  </div>
                )}
              </Draggable>
            ))}

            {!contentData.length && (
              <EmptyContentPlaceholder
                src="https://corenglish.com/wp-content/plugins/super-forms/assets/images/drop-here.png"
                alt="Drop elements here"
              />
            )}

            {provided.placeholder}
          </MainContainer>
        )}
      </Droppable>
    </div>
  );
}
