import React from "react";

export const Button = (props) => {
  const { className, label, onClick, onChange } = props;
  return (
    <>
      <button
        onClick={onClick}
        onChange={onChange}
        className={`${className} bg-red-400 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-red-500`}
      >
        {label}
      </button>
    </>
  );
};


//#009999