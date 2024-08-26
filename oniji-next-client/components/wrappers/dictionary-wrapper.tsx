"use client";

import { createContext, useContext } from "react";

const DictionaryContext = createContext({});

export function DictionaryProvider({ dict, children }: { dict: any, children: React.ReactNode }) {
  return (
    <DictionaryContext.Provider value={dict}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  return useContext(DictionaryContext);
}
