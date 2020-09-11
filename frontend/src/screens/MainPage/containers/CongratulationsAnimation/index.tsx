import React, { createRef, useEffect } from 'react';
import { ConfettiCannon } from '@screens/MainPage/containers/ConfettiCannon';
import { useWindowSize } from 'react-use';
import './animation.sass';
import anime from 'animejs/lib/anime.es';

export interface ICongratulationsAnimationProps {
  title: string;
  onCompletion: () => void;
}

export const CongratulationsAnimation: React.FC<ICongratulationsAnimationProps> = ({ title, onCompletion }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const titleRef = createRef<HTMLHeadingElement>();

  useEffect(() => {
    const titleElem = titleRef.current;
    titleElem.innerHTML = titleElem.textContent.replace(/\S/g,
      "<span class='congratulation_animation__letter'>$&</span>");

    anime.timeline()
      .add({
        targets: '.congratulation_animation__container',
        opacity: [0, 1],
        easing: 'linear',
        duration: 1000
      })
      .add({
        targets: '.congratulation_animation__title .congratulation_animation__letter',
        translateY: [100, 0],
        translateZ: 0,
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 1400,
        delay: (el, i) => 300 + 30 * i
      })
      .add({
        targets: '.congratulation_animation__title .congratulation_animation__letter',
        translateY: [0, -100],
        opacity: [1, 0],
        easing: 'easeInExpo',
        duration: 1200,
        delay: (el, i) => 100 + 30 * i
      })
      .add({
        targets: '.congratulation_animation__container',
        opacity: [1, 0],
        easing: 'linear',
        duration: 400
      })
      .add({
        targets: '.congratulation_animation__container',
        zIndex: -1,
        complete: onCompletion
      });
  }, []);

  return (
    <div className="congratulation_animation__container">
      <h1 className="congratulation_animation__title" ref={titleRef}>{title}</h1>
      <ConfettiCannon
        confettiSource={{ x: -40, y: windowHeight - 200, w: 20, h: 20 }}
      />
      <ConfettiCannon
        confettiSource={{ x: windowWidth, y: windowHeight - 200, w: 20, h: 20 }}
      />
    </div>
  );
};
