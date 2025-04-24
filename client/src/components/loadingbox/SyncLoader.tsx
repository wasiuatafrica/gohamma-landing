import React from 'react';
import { SyncLoader } from 'react-spinners';

interface SyncLoadingProps {
  size?: number;
  color?: string;
}

export default function SyncLoading({ size = 7, color = "#ABABAB" }: SyncLoadingProps) {
  return (
        <div className="loadingBoxComp p-1" >
                <SyncLoader color={color} size={size} speedMultiplier={.55} />
        </div>
  );
}
