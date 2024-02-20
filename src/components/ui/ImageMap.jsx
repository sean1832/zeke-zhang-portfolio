import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

// https://imagemap.org/

const ImageMap = ({ src, alt, hotspots }) => {
  const imageRef = useRef(null);
  const [scalingFactor, setScalingFactor] = useState({ width: 1, height: 1 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMarkerClick = (index) => {
    hotspots[index].onClick && hotspots[index].onClick();
  };

  const handleMarkerMouseEnter = (index) => {
    hotspots[index].onMouseEnter && hotspots[index].onMouseEnter();
  };

  const handleMarkerMouseLeave = (index) => {
    hotspots[index].onMouseLeave && hotspots[index].onMouseLeave();
  };

  const getSvgOriginalDimensions = (svgElement) => {
    if (svgElement && svgElement.getAttribute("viewBox")) {
      const viewBox = svgElement.getAttribute("viewBox").split(" ");
      return {
        width: parseFloat(viewBox[2]),
        height: parseFloat(viewBox[3]),
      };
    }
    return null;
  };

  const getOriginalDimensions = () => {
    const svgElement = imageRef.current;

    // For inline SVG
    if (svgElement && svgElement.tagName.toLowerCase() === "svg") {
      const dimensions = getSvgOriginalDimensions(svgElement);
      if (dimensions) return dimensions;
    }

    // For <img> or when original dimensions are predefined/external
    // Replace these values with actual original dimensions or logic to retrieve them
    const predefinedDimensions = { width: 100, height: 100 }; // Example hardcoded dimensions

    return predefinedDimensions;
  };

  // Function to update the scaling factor based on the SVG's original and rendered size
  const updateScalingFactor = () => {
    const svgElement = imageRef.current;
    setIsLoaded(true);
    if (!svgElement) return;

    // Assuming getOriginalDimensions is a function you've defined to get the SVG's original dimensions
    const { width: originalWidth, height: originalHeight } = getOriginalDimensions(svgElement);

    const rect = svgElement.getBoundingClientRect();
    setScalingFactor({
      width: rect.width / originalWidth,
      height: rect.height / originalHeight,
    });
  };

  useEffect(() => {
    // Ensure the scaling factor is recalculated on initial load and when the `src` prop changes
    updateScalingFactor();

    // Optionally, add an event listener for window resize if you want to update the scaling factor when the window is resized
    window.addEventListener("resize", updateScalingFactor);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", updateScalingFactor);
    };
  }, [src]); // Add any other props or state variables that, when changed, should trigger a recalculation of the scaling factor

  return (
    <div className="w-full relative">
      <img src={src} alt={alt} ref={imageRef} useMap="#image_map" onLoad={updateScalingFactor} />
      {!isLoaded && <div className="daisy-skeleton w-full h-[1800px]" />}
      {isLoaded &&
        hotspots.map((spot, index) => {
          const style = {
            position: "absolute",
            left: `${spot.x * scalingFactor.width - (spot.radius * scalingFactor.width) / 0.7}px`, // Adjust for centering
            top: `${spot.y * scalingFactor.height - (spot.radius * scalingFactor.height) / 0.7}px`, // Adjust for centering
            width: `${spot.radius * 0.7}px`, // Optional: Consider not scaling the size or apply a different strategy
            height: `${spot.radius * 0.7}px`, // Optional: Consider not scaling the size or apply a different strategy
          };
          return (
            <div
              key={index}
              style={style}
              onClick={() => handleMarkerClick(index)}
              onMouseEnter={() => handleMarkerMouseEnter(index)}
              onMouseLeave={() => handleMarkerMouseLeave(index)}
            >
              {React.cloneElement(spot.component, {
                style: { width: "100%", height: "100%" }, // Ensure the spot component fills the container
              })}
            </div>
          );
        })}
      <map name="image_map">
        {hotspots.map((spot, index) => (
          <area
            key={index}
            shape="circle"
            coords={`${spot.x},${spot.y},${spot.radius}`}
            href={spot.href || "#"}
            alt={spot.alt || ""}
          />
        ))}
      </map>
    </div>
  );
};

ImageMap.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      radius: PropTypes.number.isRequired,
      component: PropTypes.element.isRequired,
      onClick: PropTypes.func,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
    })
  ),
};

export default ImageMap;
