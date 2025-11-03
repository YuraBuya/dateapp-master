"use client";

import { ConfigProvider } from "antd";
import React from "react";

export function AntProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 6,
        },
      }}
      // React 19 호환성 경고 억제
      warning={{
        strict: false,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
