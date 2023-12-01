import React from "react";

interface IInput {
  type: "text" | "password" | "email" | "number" | "checkbox" | "date";
  name: string;
  placeholder: string;
  value?: string ;
		checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = (props: IInput) => {
  const { type, name, placeholder, value, onChange, className } = props;
  if (type === "checkbox")
    return (
      <div className="flex justify-between items-center gap-4 content-center">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          checked={props.checked}
          onChange={onChange}
          className={`w-5 h-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
            className ? className : ""
          }`}
        />
        <span>{placeholder}</span>
      </div>
    );
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent ${
        className ? className : ""
      }`}
    />
  );
};

export default Input;
