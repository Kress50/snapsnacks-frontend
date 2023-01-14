/* eslint-disable jsx-a11y/aria-role */
import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => {
  return (
    <span role="error" className="error mt-1">
      {errorMessage}
    </span>
  );
};
