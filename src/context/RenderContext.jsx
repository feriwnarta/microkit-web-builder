import { createContext, useContext, useState } from "react";

const RenderContext = createContext();

export const useRenderContext = () => useContext(RenderContext);

export const RenderContextProvider = ({ children }) => {
  const [renderContent, setRenderContent] = useState("");
  const [sizeRender, setSizeRender] = useState({ width: "100%" });

  return (
    <RenderContext.Provider value={{ renderContent, setRenderContent, sizeRender, setSizeRender }}>
      {children}
    </RenderContext.Provider>
  );
};
