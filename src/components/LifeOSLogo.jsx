import React from "react";
import LifeOSLogo from "./LifeOSLogo";

export default function LifeOSLogo({ variant = "full", className = "", style = {} }) {
  const src = "/brand/lifeos-logo.png";

  if (variant === "mark") {
    return (
      <div
        className={`lifeos-logo-mark ${className}`}
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          overflow: "hidden",
          background: "#fff",
          display: "grid",
          placeItems: "center",
          ...style,
        }}
      >
        <img
          src={src}
          alt="Life OS"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt="Life OS"
      className={className}
      style={{
        display: "block",
        width: "auto",
        maxWidth: "100%",
        objectFit: "contain",
        ...style,
      }}
    />
  );
}
