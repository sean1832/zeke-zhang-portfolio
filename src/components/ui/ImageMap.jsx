import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import imageMapResize from "../utility/ImageMapResizer";

// https://imagemap.org/

const ImageMap = ({ src, alt, hotspots }) => {
  const imageRef = useRef(null);
  const mapRef = useRef(null); // Reference to the <map> element
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

  // Adjusted to directly use the imported imageMapResize function
  const resizeImageMap = () => {
    if (mapRef.current) {
      imageMapResize(mapRef.current);
    }
  };

  const updateScalingFactor = () => {
    const image = imageRef.current;
    if (image && image.complete && image.naturalHeight !== 0) {
      setScalingFactor({
        width: image.offsetWidth / image.naturalWidth,
        height: image.offsetHeight / image.naturalHeight,
      });
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      image.addEventListener("load", () => {
        setIsLoaded(true);
        updateScalingFactor();
        resizeImageMap(); // Call after image load and scaling factor update
      });
    }
    window.addEventListener("resize", () => {
      updateScalingFactor();
      resizeImageMap(); // Ensure map is resized on window resize as well
    });
    return () => {
      window.removeEventListener("resize", resizeImageMap);
    };
  }, []);

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
