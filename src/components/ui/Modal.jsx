import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
// import './Modal.css'

const Modal = ({ isOpen, onClose, children, variant }) => {
  const modalContentRef = useRef(); // Ref for the modal content

  // Handle click outside of modal content
  const handleClickOutside = (event) => {
    console.log("Document clicked");
    if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
      console.log("Click outside modal content detected");
      onClose();
    }
  };

  // Attach listener for clicks
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  // Handle scroll bar hide when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`
        fixed 
        inset-0 
        bg-gray-800 
        bg-opacity-50 
        overflow-y-auto 
        h-full 
        w-full 
        z-40 
        backdrop-blur-sm 
        flex 
        justify-center 
        ${variant === "center" ? "items-center" : "items-start"} 
        py-3
    `}
    >
      <div
        ref={modalContentRef}
        className="mx-auto p-5 border w-auto shadow-lg rounded-lg bg-primary"
      >
        <div className="text-white">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["center", "top"]),
};

Modal.defaultProps = {
  variant: "center",
};

export default Modal;
