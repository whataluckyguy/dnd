import React from "react";
import { useCallback } from "react";
import { Divider, Button } from "./styles.js";
import Section from "./Section.js";

const useContentController = (contentData) => {
  const content = useCallback(
    (title, index, sectionAlignIndex, singleSectionIndex) => {
      //   console.log("from usecontentcontroller ", {
      //     singleSectionIndex,
      //     sectionAlignIndex,
      //     c: contentData[index].sections[sectionAlignIndex],
      //   });
      if (sectionAlignIndex != null && singleSectionIndex != null) {
        switch (title) {
          case "Text":
            return contentData[index].sections[sectionAlignIndex][
              singleSectionIndex
            ].properties.text;
          case "Image":
            return "🖼️ Add image";
          case "Button":
            return (
              <Button>
                {" "}
                {
                  contentData[index].sections[sectionAlignIndex][
                    singleSectionIndex
                  ].properties.text
                }{" "}
              </Button>
            );
          case "Spacer":
            return <div> </div>;
          case "Divider":
            return (
              <Divider
                width={
                  contentData[index].sections[sectionAlignIndex][
                    singleSectionIndex
                  ].properties.height
                }
              />
            );
          default:
            return <></>;
        }
      } else {
        switch (title) {
          case "Text":
            return contentData[index].properties.text;
          case "Image":
            return "🖼️ Add image";
          case "Button":
            return <Button> {contentData[index].properties.text} </Button>;
          case "Spacer":
            return <div> </div>;
          case "Divider":
            return (
              <Divider
                // width="15px"
                width={contentData[index].properties.height}
              />
            );
          case "Section":
            return <Section index={index} />;
          default:
            return <></>;
        }
      }
    },
    [contentData]
  );

  return {
    content,
  };
};

export default useContentController;
