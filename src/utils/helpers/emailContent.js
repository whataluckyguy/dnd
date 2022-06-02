import { black, whiteBG } from "../colors";

// raw styles
const padding = {
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingBottom: "15px",
  paddingTop: "15px",
};
const width = { width: "100%" };
const height = { height: "15px", width: "100%" };
const alignment = {
  display: "flex",
  justifyContent: "center",
};
const backgroundColor = { backgroundColor: black, color: whiteBG };
const color = { color: black };
const fontSize = { fontSize: "1rem" };

// content data for every new block
const newContentBlockData = (title) => {
  switch (title) {
    case "Text":
      return {
        title,
        style: { ...fontSize, ...color, ...alignment, ...width, ...padding },
        settings: [
          "Thickness",
          "Color",
          "Alignment",
          "Width",
          "Padding",
          "Text",
        ],
        properties: {
          text: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                    dummy text ever since the 1500s.`,
        },
      };

    case "Spacer":
      return {
        title,
        style: { ...height },
        settings: ["Height"],
      };

    case "Divider":
      return {
        title,
        style: { ...backgroundColor, ...alignment, ...width, ...padding },
        settings: ["Thickness", "Color", "Alignment", "Width", "Padding"],
        properties: { height: "15px", text: "Divider text" },
      };

    case "Button":
      return {
        title,
        style: { width: "100%", ...padding, ...alignment },
        settings: ["Text", "URL", "Alignment", "Width", "Padding"],
        properties: {
          url: null,
          text: "Click to edit",
          backgroundColor: black,
          color: whiteBG,
        },
      };

    case "Image":
      return {
        title,
        style: { ...padding },
        properties: { url: null },
      };

    case "Social":
      return {
        title,
        style: { gap: "8px", ...alignment, borderRadius: "1000px", ...padding },
        settings: ["Spacing", "Alignment", "BorderRadius"],
        properties: {
          icons: [
            { name: "facebook", url: "https://facebook.com" },
            { name: "twitter", url: "https://twitter.com" },
            { name: "youtube", url: "https://youtube.com" },
            { name: "linkedin", url: "https://liknedin.com" },
            { name: "pinterest", url: "https://pinterest.com" },
            { name: "whatsapp", url: "https://web.whatsapp.com" },
            { name: "instagram", url: "https://instagram.com" },
          ],
        },
      };

    case "Unsubscribe":
      return {
        title,
        style: { ...padding },
        properties: { visbility: true },
      };

    case "Section":
      return {
        title,
        sections: [[], []],
      };

    default:
      return {};
  }
};

export const addEmailContent = (title, setContentData) => {
  const newBlockData = newContentBlockData(title);
  if (
    [
      "Text",
      "Spacer",
      "Divider",
      "Image",
      "Button",
      "Social",
      "Unsubscribe",
    ].includes(title)
  )
    setContentData((prev) => {
      return [...prev, newBlockData];
    });

  if (title === "Section")
    setContentData((prev) => {
      return [
        ...prev,
        {
          title,
          sections: [[], []],
        },
      ];
    });
};

export const updateSectionContent = (
  title,
  action,
  index,
  sectionAlignIndex,
  setContentData
) => {
  setContentData((prev) => {
    const copyPrev = [...prev];
    let copySection = copyPrev[index].sections[sectionAlignIndex];

    if (copySection.length >= 3) return;
    copySection.push(newContentBlockData(title));

    return [...copyPrev];
  });
};
