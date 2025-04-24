import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ClipLoadingProps {
  size?: number;
  color?: string;
}

export default function ClipLoading({ size = 7, color = "#ABABAB" }: ClipLoadingProps) {
  return (
        <div className="loadingBoxComp p-1" >
                <ClipLoader color={color} size={size} speedMultiplier={.55} />
        </div>
  );
}
