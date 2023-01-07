import React from "react";

interface IErrorProps {
  errorMessage: string;
}

export const Error: React.FC<IErrorProps> = ({ errorMessage }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <span className="error">{errorMessage}</span>;
    </div>
  );
};
