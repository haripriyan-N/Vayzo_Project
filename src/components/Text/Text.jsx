import "./Text.css";

function Text({ children, variant = "body" }) {
  return <p className={`text text-${variant}`}>{children}</p>;
}

export default Text;
