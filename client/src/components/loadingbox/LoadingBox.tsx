import React from 'react';
import { PuffLoader } from 'react-spinners';

interface LoadingBoxProps {
  size?: number;
  color?: string;
  text?: string;
}

export default function LoadingBox({ size = 45, color = "#D4177D", text = "" }: LoadingBoxProps) {
  return (
    <div className="loadingBoxComp" style={{ width: size, height: size }}>
      <PuffLoader color={color} size={size} />
      {text && <span className="LoadingText">{text}</span>}
    </div>
  );
}
