import React from "react";
import "../../styles/variables.css";

export default function Icon({ d, w, h, color }) {
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={d} stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
