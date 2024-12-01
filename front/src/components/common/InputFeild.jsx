import { forwardRef } from "react";

const InputField = forwardRef(
  ({ disabled = false, error, touched, className = "", ...props }, ref) => {
    return (
      <div className="w-full h-14">
        <div className="relative cursor-text">
          <div
            className={`
              border rounded-lg p-3 bg-gray-100
              ${disabled ? "bg-gray-200" : ""}
              ${touched && error ? "border-red-500 bg-red-50/10" : "border-gray-200"}
              ${className}
            `}
          >
            <input
              ref={ref}
              {...props}
              className={`
                w-full text-base leading-6 p-0 h-6
                bg-transparent border-none outline-none
                ${disabled ? "text-gray-500 cursor-not-allowed" : "text-black"}
                placeholder:text-gray-400
              `}
              disabled={disabled}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>
        </div>
        {touched && error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

export default InputField;
