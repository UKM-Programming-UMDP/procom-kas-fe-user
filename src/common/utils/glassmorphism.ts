type GlassmorphismProps = {
  container?: boolean;
  border?: boolean;
  hover?: boolean;
};
const glassmorphism = ({ container, border, hover }: GlassmorphismProps) => {
  let classes = "";
  if (container) {
    classes +=
      "bg-purple-50 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-5 ";
  }
  if (hover) {
    classes +=
      "hover:bg-purple-100 hover:bg-opacity-10 transition-all duration-200 ";
  }
  if (border) {
    classes += "border border-purple-200";
  }
  return classes.trim();
};

export default glassmorphism;
