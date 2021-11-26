import React from "react";

export const PayButton: React.FC = () => {
  return (
    <div
      style={{
        textAlign: "center",
        border: "1px solid gray",
        cursor: "pointer",
        width: "300px",
        height: "50px",
        lineHeight: "50px",
      }}
    >
      <img
        src="https://finmid.com/assets/images/image01.png?v=4ee1c69a"
        style={{
          marginBottom: -2,
          marginRight: 5,
          height: 20,
        }}
      />
      Buy Now
    </div>
  );
};
