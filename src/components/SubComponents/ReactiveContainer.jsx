import PropTypes from "prop-types";

const ReactiveContainer = ({ children }) => {
  return (
    // wrapper div maintains aspect ratio
    <div className="w-full h-full">{children}</div>
  );
};

export default ReactiveContainer;
