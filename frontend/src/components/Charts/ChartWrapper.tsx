import React from 'react';

export interface IChart {
  children: any;
  id?: string;
  width: number;
  height: number;
}

export const ChartWrapper: React.FC<IChart> = ({ children, id = 'chart', width, height }) => (
  <div id={id}>
    <svg width={width} height={height}>
      {children}
    </svg>
  </div>
);
