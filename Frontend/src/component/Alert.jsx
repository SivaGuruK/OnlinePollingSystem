import React, { useEffect } from "react";

export default function Alert({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-400",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-3 rounded shadow border ${bgColor} flex items-center justify-between min-w-[250px]`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button className="ml-4 font-bold text-lg" onClick={onClose}>
        ×
      </button>
    </div>
  );
}
