const glassmorphismContainer = () => {
  return "bg-purple-50 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5";
};

const glassmorphismContainerHover = () => {
  return "hover:bg-purple-100 hover:bg-opacity-10 transition-all duration-200";
};

const glassmorphismContainerBorder = () => {
  return "border border-purple-200";
};

export {
  glassmorphismContainer,
  glassmorphismContainerHover,
  glassmorphismContainerBorder,
};
