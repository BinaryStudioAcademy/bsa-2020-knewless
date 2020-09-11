import Confetti from 'react-confetti';
import React from 'react';
import { IConfettiOptions } from 'react-confetti/dist/types/Confetti';

export const ConfettiCannon: React.FC<Partial<IConfettiOptions> & React.CanvasHTMLAttributes<HTMLCanvasElement> & {
  canvasRef?: React.RefObject<HTMLCanvasElement> | ((instance: HTMLCanvasElement | null) => void) | null | undefined;
} & React.RefAttributes<HTMLCanvasElement>> = props => (
  <Confetti
    recycle={false}
    tweenDuration={100}
    initialVelocityX={14}
    initialVelocityY={20}
    {...props}
  />
);
