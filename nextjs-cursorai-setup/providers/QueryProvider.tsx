"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

// Client Component에서 QueryClient 인스턴스 생성
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // useState를 사용하여 QueryClient 인스턴스를 한 번만 생성
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
