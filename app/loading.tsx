import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex-1 w-full flex items-center justify-center min-h-0">
      <div className="flex w-full h-[80vh] justify-center items-center">
        <div className="container-loader">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
}
