import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ImageMapResizer } from "../utility";

// https://imagemap.org/

const ImageMap = ({ src, alt, hotspots }) => {
  const imageRef = useRef(null);
  const [scalingFactor, setScalingFactor] = useState({ width: 1, height: 1 });
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMarkerClick = (index) => {
    if (hotspots[index].onClick) {
      hotspots[index].onClick();
    }
  };

  const handleMarkerMouseEnter = (index) => {
    if (hotspots[index].onMouseEnter) {
      hotspots[index].onMouseEnter();
    }
  };

  const handleMarkerMouseLeave = (index) => {
    if (hotspots[index].onMouseLeave) {
      hotspots[index].onMouseLeave();
    }
  };

  const updateScalingFactor = () => {
    const image = imageRef.current;
    if (image && image.complete && image.naturalHeight !== 0) {
      setScalingFactor({
        width: image.width / image.naturalWidth,
        height: image.height / image.naturalHeight,
      });
    }
  };

  useEffect(() => {
    const image = imageRef.current;
    if (image) {
      // Trigger updateScalingFactor() if image is first loaded
      image.addEventListener("load", updateScalingFactor);
    }
    // Trigger updateScalingFactor() if window is resized
    window.addEventListener("resize", updateScalingFactor);
    return () => {
      if (image) {
        image.removeEventListener("load", updateScalingFactor);
      }
      window.removeEventListener("resize", updateScalingFactor);
    };
  }, []);

  useEffect(() => {
    const useMapName = imageRef.current?.useMap;

    if (useMapName) {
      ImageMapResizer(useMapName);
    }
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
      <div className={`w-full h-[1800px] ${!isLoaded ? "daisy-skeleton" : ""}`} />

      {isLoaded &&
        hotspots.map((spot, index) => {
          const Component = spot.component;
          const style = {
            position: "absolute",
            left: `${(spot.x - spot.radius) * scalingFactor.width}px`,
            top: `${(spot.y - spot.radius) * scalingFactor.height}px`,
            width: `${spot.radius * 2 * scalingFactor.width}px`,
            height: `${spot.radius * 2 * scalingFactor.height}px`,
            // more styles...
          };

          return (
            <div key={index} style={style}>
              {React.cloneElement(Component, {
                onClick: () => handleMarkerClick(index),
                onMouseEnter: () => handleMarkerMouseEnter(index),
                onMouseLeave: () => handleMarkerMouseLeave(index),
                // more props...
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
            href={spot.href}
            alt={spot.alt}
          />
        ))}
      </map>
    </div>
  );
};

ImageMap.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  href: PropTypes.string,
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
