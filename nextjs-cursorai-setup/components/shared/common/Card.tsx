import React from "react";

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-white border border-gray-200 rounded-lg px-6 py-5 mx-auto mt-5">{children}</div>
);

export default Card; 