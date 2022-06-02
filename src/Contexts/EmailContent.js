import { createContext, useContext, useState } from "react";

const Content = createContext();

const Context = ({ children }) => {
  const [contentData, setContentData] = useState([])

  return (
    <Content.Provider value = {{ contentData, setContentData }}>
      {children}
    </Content.Provider>
  );
};

export const ContentState = () => {
  return useContext(Content);
};

export default Context