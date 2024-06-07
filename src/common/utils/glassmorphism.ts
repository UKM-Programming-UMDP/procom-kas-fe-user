type GlassmorphismProps = {
  container?: boolean;
  border?: boolean;
  hover?: boolean;
};
const glassmorphism = ({ container, border, hover }: GlassmorphismProps) => {
  let classes = "";
  if (container) {
    classes += "bg-fuchsia-300/5 ";
  }
  if (hover) {
    classes += "hover:bg-violet-300/10 transition-all duration-200 ";
  }
  if (border) {
    classes += "border border-purple-700/20";
  }
  return classes.trim();
};

export default glassmorphism;
