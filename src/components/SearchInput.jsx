import React from "react";

const SearchInput = ({ value, onChange, placeholder = "Pretraži...", className = "" }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-75 text-sm px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 outline-none focus:border-blue-400 focus:bg-white transition-colors ${className}`}
    />
  );
};

export default SearchInput;
