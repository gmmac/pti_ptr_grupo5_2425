import React from "react";
import { Stack } from "react-bootstrap";
import Swirl from "../svg/Swirl";

export default function WelcomeLG() {
  return (
    <div
      style={{
        backgroundColor: "var(--white)",
        boxShadow: "var(--shadow-default)",
        borderRadius: "var(--rounded-lg)",
        WebkitMaskImage: "inset(0 round var(--rounded-lg))",
        maskImage: "inset(0 round var(--rounded-lg))",
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: -40,
        }}
      >
        <Swirl
          w="646"
          h="753"
          vb="0 0 646 753"
          d="M28.936 11.5442C20.0153 26.977 3.43603 57.5443 18.4361 94.0442C37.7512 141.044 83.4785 175.273 121.935 179.625C164.501 184.443 226.486 171.944 230.936 117.544C234.818 70.0941 191.616 42.5528 149.118 43.9493C125.95 44.7105 105.094 58.5433 92.6722 75.8823C72.5079 104.029 65.0322 141.203 65.3292 175.447C65.684 216.354 67.6047 252.067 92.6722 285.044C112.436 311.044 131.365 325.63 164.319 341.042C199.296 357.4 239.237 362.991 277.214 367.156C312.795 371.059 353.539 367.07 384.806 348.043C413.262 330.728 434.431 304.923 434.003 272.925C433.678 248.643 422.71 224.844 400.26 211.627C374.31 196.35 344.927 206.669 331.066 215.556C317.706 224.12 296.088 240.445 285.664 252.392C257.018 285.224 244.357 319.139 230.936 360.839C220.799 392.335 229.834 437.104 243.633 467.477C261.344 506.462 290.826 532.362 326.467 550.191C380.498 577.22 430.361 608.624 525.436 576.544C550.936 567.94 569.335 546.679 573.301 532.362C577.266 518.044 578.094 498.736 563.436 480.044C548.778 461.353 523.436 460.57 512.4 461.353C481.436 463.549 467.278 479.954 457.601 495.031C434.037 531.745 428.744 585.4 449.679 625.162C469.082 662.014 501.309 699.152 538.936 718.544C562.733 730.809 608.936 746.044 633.936 740.044"
          color="var(--variant-two)"
          strokeWidth="23"
          style={{
            position: "absolute",
            top: "-20",
            left: "10",
            zIndex: "1",
          }}
        />
      </div>
      <Stack
        direction="vertical"
        style={{
          position: "relative",
          zIndex: "3",
          width: "100%",
          height: "100%",
        }}
        className="px-5 py-4 justify-content-end align-items-start"
      >
        <h1
          className="mb-0"
          style={{
            fontSize: "48px",
            fontFamily: "var(--title-font)",
            color: "var(--variant-two)",
          }}
        >
          Welcome to
        </h1>
        <h1
          className="mb-0"
          style={{
            fontSize: "48px",
            fontFamily: "var(--title-font)",
            color: "var(--variant-two)",
          }}
        >
          TechAway
        </h1>
      </Stack>
    </div>
  );
}
