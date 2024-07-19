import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  return (
    <div>AppContextProvider</div>
  )
}

export default AppContextProvider