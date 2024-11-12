import React, { createContext, useContext } from "react";

interface UnsplashContextType {
  accessKey: string;
}

const UnsplashContext = createContext<UnsplashContextType | null>(null);

interface UnsplashProviderProps {
  accessKey: string;
  children: React.ReactNode;
}

export const UnsplashProvider: React.FC<UnsplashProviderProps> = ({
  accessKey,
  children,
}) => {
  return (
    <UnsplashContext.Provider value={{ accessKey }}>
      {children}
    </UnsplashContext.Provider>
  );
};

export const useUnsplashContext = () => {
  const context = useContext(UnsplashContext);
  if (!context) {
    throw new Error(
      "useUnsplashContext must be used within an UnsplashProvider"
    );
  }
  return context;
};
