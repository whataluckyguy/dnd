import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import { blueBG, blueBG1, opaqueGray, whiteBG } from "../src/utils/colors";
import SectionDivider from "./components/SectionDivider.js";
import Content from "./components/Content";
import Build from "./components/Build";
import { blockItems } from "./utils/data";
import MetaData from "./components/MetaData";
import {
  addEmailContent,
  updateSectionContent,
} from "./utils/helpers/emailContent";
import { checkDOMelements, getDropIndex, reorderList } from "./utils/helpers";
import Test from "./components/Test";
import { ContentState } from "./Contexts/EmailContent";

function App() {
  const [activeMainSection, setActiveMainSection] = useState("Content");
  const [activeSideSection, setActiveSideSection] = useState("Build");
  const [buildBG, setBuildBG] = useState("transparent");
  const { contentData, setContentData } = ContentState();

  const deleteContentItem = useCallback(
    (index) => {
      const cdata = [...contentData];
      cdata.splice(index, 1);
      setContentData(cdata);
    },
    [contentData, setContentData]
  );

  const mainSectionData = [
    {
      name: "Content",
      component: (
        <Content buildBG={buildBG} deleteContentItem={deleteContentItem} />
      ),
    },
    {
      name: "Audience",
      component: <>Work in progress :)</>,
    },
    {
      name: "Schedule",
      component: <>Work in progress</>,
    },
  ];

  const sideSectionData = [
    {
      name: "Metadata",
      component: <MetaData />,
    },
    {
      name: "Build",
      component: <Build />,
    },
    {
      name: "Test",
      component: <Test />,
    },
  ];

  useEffect(
    () => console.log("content data from app.js ", { contentData }),
    [contentData]
  );

  const ondragend = useCallback(
    (result) => {
      setBuildBG(() => whiteBG);

      if (
        result.destination?.droppableId === "mail-template-content" &&
        result.source?.droppableId === "mail-template-content"
      ) {
        setContentData(
          reorderList(
            contentData,
            result.source.index,
            result.destination.index
          )
        );
      }
    },
    [contentData, setContentData]
  );

  const onBlockDragEnd = (result) => {
    const a = document.querySelectorAll(":hover");
    setBuildBG(() => whiteBG);

    const className = checkDOMelements(
      ["subsection-0", "subsection-1", "root-content"],
      a
    );
    const contentIndex = getDropIndex("content-item-", a);
    const sectionAlignIndex = getDropIndex("subsection-", a);
    console.log({ className, a, contentIndex, sectionAlignIndex });
    if (!className) return;

    if (className === "root-content")
      addEmailContent(blockItems[result.source.index].name, setContentData);
    else if (className.includes("subsection"))
      updateSectionContent(
        blockItems[result.source.index].name,
        "add",
        contentIndex,
        sectionAlignIndex,
        setContentData
      );
  };

  const ondragstart = useCallback(() => {
    setBuildBG(() => opaqueGray);
  }, []);

  return (
    <>
      {/* <Navbar /> */}

      <StyledMainContainer>
        <StyledTemplateSection>
          <DragDropContext onDragEnd={onBlockDragEnd} onDragStart={ondragstart}>
            <SectionDivider
              sectionData={sideSectionData}
              activeSection={activeSideSection}
              setActiveSection={setActiveSideSection}
              style={{ minWidth: "300px", maxWidth: "300px" }}
              background={true}
            />
          </DragDropContext>
          <DragDropContext onDragEnd={ondragend} onDragStart={ondragstart}>
            <SectionDivider
              sectionData={mainSectionData}
              activeSection={activeMainSection}
              setActiveSection={setActiveMainSection}
              style={{ width: "calc(100% - 300px)" }}
            />
          </DragDropContext>
        </StyledTemplateSection>
      </StyledMainContainer>
    </>
  );
}

export default App;

const StyledMainContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${blueBG};
  min-height: calc(100vh - 75px);
  padding-top: 75px;
  width: 100vw;
`;
const StyledTemplateSection = styled.div`
  width: 80vw;
  padding: 30px;
  background-color: ${whiteBG};
  border-radius: 15px;

  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
`;

const Navbar = styled.div`
  width: 100vw;
  height: 75px;
  box-shadow: 0px 20px 15px 0px ${blueBG1};
`;
