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

  useEffect(() => {
    const image = imageRef.current;

    const updateScalingFactor = () => {
      const rect = image.getBoundingClientRect(); // Get the rendered dimensions

      // Fallback dimensions if viewBox is not accessible
      let naturalWidth = rect.width;
      let naturalHeight = rect.height;

      // Attempt to access viewBox for more accurate dimensions
      const viewBoxAttr = image.getAttribute("viewBox");
      if (viewBoxAttr) {
        const viewBoxParts = viewBoxAttr.split(" ");
        if (viewBoxParts.length === 4) {
          naturalWidth = parseFloat(viewBoxParts[2]);
          naturalHeight = parseFloat(viewBoxParts[3]);
        }
      }

      if (rect.width && rect.height) {
        setScalingFactor({
          width: rect.width / naturalWidth,
          height: rect.height / naturalHeight,
        });
        setIsLoaded(true);
      }
    };

    // Ensure this logic runs after the SVG is fully loaded
    if (image.complete || image.tagName.toLowerCase() === "svg") {
      updateScalingFactor();
    } else {
      image.addEventListener("load", updateScalingFactor);
      return () => image.removeEventListener("load", updateScalingFactor);
    }
  }, []);

  useEffect(() => {
    const updateScalingFactor = () => {
      const image = imageRef.current;
      if (!image) return;

      const rect = image.getBoundingClientRect(); // Get the rendered dimensions

      // Assuming a method to get original dimensions, replace with actual values or method
      const originalDim = getOriginalDimensions();
      const originalWidth = originalDim.width; /* your method to get original width */
      const originalHeight = originalDim.height; /* your method to get original height */

      setScalingFactor({
        width: rect.width / originalWidth,
        height: rect.height / originalHeight,
      });
    };

    // Update scaling factor upon window resize
    window.addEventListener("resize", updateScalingFactor);

    // Initial update in case of any asynchronous loading or dynamic sizing
    updateScalingFactor();

    // Cleanup to avoid memory leaks
    return () => window.removeEventListener("resize", updateScalingFactor);
  }, []); // Empty dependency array means this effect runs once on mount, but consider dependencies if needed

  return (
    <div className="w-full relative">
      <img
        src={src}
        alt={alt}
        ref={imageRef}
        useMap="#image_map"
        onLoad={() => setIsLoaded(true)}
      />
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
