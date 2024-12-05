const CustomButton = ({
  label,
  size = "md",
  outline = true,
  onClick = () => console.log(label, "눌림"),
  disable = false,
  ...props
}) => {
  //sm 해야함
  const className = `font-bold py-2 px-4 rounded transition-colors duration-150
      ${size === "lg" ? "w-full" : "px-4 py-2"} 
      ${
        outline
          ? "bg-transparent text-blue-700 border border-cta-active hover:bg-cta hover:text-white hover:border-transparent"
          : "bg-cta text-white hover:bg-cta-active"
      }
      ${disable ? "opacity-50 cursor-not-allowed" : ""}
    `;

  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disable}
      {...props}
    >
      {label}
    </button>
  );
};

export default CustomButton;
