"use client";

import React, { createContext, useState, ReactNode, useMemo } from "react";

type OpenMap = { [commentId: number]: boolean };

interface OpenRepliesContextType {
  openMap: OpenMap;
  setOpenMap: (updater: (prev: OpenMap) => OpenMap) => void;
}

const OpenRepliesContext = createContext<OpenRepliesContextType | null>(null);

export function OpenRepliesProvider({ children }: { children: ReactNode }) {
  const [openMap, setOpenMap] = useState<OpenMap>({});

  const value = useMemo(() => ({ openMap, setOpenMap }), [openMap]);

  return (
    <OpenRepliesContext.Provider value={value}>
      {children}
    </OpenRepliesContext.Provider>
  );
}

export { OpenRepliesContext };
